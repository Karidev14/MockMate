import express from "express";
import cors from "cors";

import mongoose from "mongoose";
import dotenv from "dotenv";
import OpenAI from "openai";

import bcrypt,{hash} from "bcryptjs";
import connectDB from "../server/config/db.js";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middleware/auth.js";



dotenv.config();

const url=process.env.MONGO_URI;
const port=5000;
const app=express();
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//register
app.post("/register", async (req, res) => {
  try {
    console.log("request body",req.body);
    const { email, name, password } = req.body;


     if (!email || !name || !password) {
      return res.status(400).json({ error: "All fields required" });
    }
    console.log("1 checking user");
    // check if user exists
    const existingUser = await mongoose.connection.db.collection("users").findOne({ email });
    console.log("2 existing user",existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("👉 Step 3: password hashed");
   await mongoose.connection.db.collection("users").insertOne({
    email,
    name,
    password:hashedPassword
   });
    console.log(" 4 user inserted successfully");
    return res.json({ message: "User registered successfully" });
  
    

  } catch (err) {
    console.log("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user from DB
    const user = await mongoose.connection.db.collection("users").findOne({email});

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });

  } catch (err) {
    console.log("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

app.get("/dashboard",verifyToken,(req,res)=>{
  res.json({
    user:req.user,
    message:"Welcome to dashboard"});
});

app.get("/test-db", async (req, res) => {
  try {
    console.log("👉 CURRENT DB:", mongoose.connection.name);
    const result = await mongoose.connection.db.collection("users").find({}).toArray();

    res.json(result);
  } catch (err) {
    console.log("Direct DB error:", err);
    res.status(500).json({ error: err.message });
  }
});

//stored data of dashboard in database
app.post("/save-interview",verifyToken,async(req,res)=>{
  try{
    const {role,difficulty,questions,answers,score,feedback}=req.body;
    await mongoose.connection.db.collection("interviews").insertOne({
      userId:req.user.id,
      role,
      difficulty,
      questions,
      answers,
      score,
      feedback,
      createdAt:new Date()
    });
    res.json({message:"Interview saved successfully"});
  }
  catch(err){
    console.log(err);
  }
})

//fetch the data from database
app.get("/dashboard-data",verifyToken,async(req,res)=>{
  try{
    const data=await mongoose.connection.db
    .collection("interviews")
    .find({userId:req.user.id})
    .toArray();
    res.json(data);
  }
  catch(err){
    res.status(500).json({err:"fail to fetch the data"});
  }
})
// Route
app.get("/",(req,res)=>{
    res.send("AI interview backent running");   
});

// AI routes
const groq=new OpenAI({
    apiKey:process.env.GROQ_AI_KEY,
      baseURL: "https://api.groq.com/openai/v1",
       
    });

app.post("/generate-questions",async(req,res)=>{

    try{
        const {count,role,difficulty}=req.body;
        const prompt=
       ` Generate ${count} interview questions for ${role}.
          Difficulty level : ${difficulty}.
          Return ONLY a JSON array.`;

          const completion=await groq.chat.completions.create({
            model:"openai/gpt-oss-20b",
            messages:[{role:"user",content:prompt}],
          });

          const aiText=completion.choices[0].message.content;
          const cleanText=aiText
          .replace(/```json/g,"")
          .replace(/```/g,"")
          .trim();
          const questions =JSON.parse(cleanText);
          res.json({questions});
        // console.log( process.env.GROQ_AI_KEY);

    }catch(err){
       console.log(err);
       res.status(500).json({error:"Failed to generate questions"});
    }
});

app.post("/evaluate",async(req,res)=>{
    const { questions, answers}=req.body;
    try{
      const prompt=`Evaluate the following interview answers.
      Questions : ${JSON.stringify(questions)}
      Answers: ${JSON.stringify(answers)}

      Return ONLY JSON in this format:
      {
      "overallScore":number,
      "questionAnalysis":[
      {
      "question":"","score":0,"feedback":""
      }],
      "strengths":[],
      "weakness":[],
      "suggestions":[]
      }`;

        const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }]
    });
    const aiResponse = completion.choices[0].message.content;
 try{
  const cleanResponse=aiResponse
          .replace(/```json/g,"")
          .replace(/```/g,"")
          .trim();

          const result=JSON.parse(cleanResponse);
          res.json(result);
 }catch(error){
  
 }
    
   
   

    }catch(err){
       console.log(err);
    }
})


// app.listen(port,()=>{
//   console.log("app started")
//   mongoose.connect(url)
//   console.log("db connected")
// })

const start=async()=>{
 try{
    await connectDB();
   console.log("db fully connected,starting server..")
    console.log("Mongoose readyState:", mongoose.connection.readyState);
  
    
    app.listen(port,()=>{
    console.log("listening on port 5000")
    
   });
 
   
 
 }
 catch(error){
  console.log("moggose connection error",error)
 }
}

start();
 
 




