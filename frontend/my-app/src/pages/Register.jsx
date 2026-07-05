import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import styles from "../styles/styles.css";
import Box from "@mui/material/Box";
import { useState } from 'react';
//import { set } from 'mongoose';
import {  useNavigate } from 'react-router-dom';

export default function Register(){
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
    const navigate=useNavigate();
  const handleRegister=async(e)=>{
    e.preventDefault();
    console.log("register clicked");
    const res= await fetch("http://localhost:5000/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        email,
        name,
        password,
      }),
      
    });
    const data = await res.json();
    console.log(data);
    if(res.ok){
      alert(data.message ||"User registered successfully");
      setEmail("");
      setName("");
      setPassword("");
    }
    else{
      alert(data.message || "registration failed");
    }
  }

   const handlecancel=()=>{
      navigate("/");
    }
    const handlelogin=()=>{
      navigate("/login");
    }
    return (
        <>

             <Box sx={{ display: "flex", minHeight: "100vh" , flexDirection: { xs: "column", md: "row" }}}>
           {/* left side */}
            <Box   sx={{
                 width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
           justifyContent: "center",
          alignItems: "center",
          gap: 2,
          p:3,
          backgroundColor: "#f5f5f5"
        }}>  
        {/* <form> */}

        
              <TextField id="outlined-basic" label="Enter Email" variant="outlined" className="email"  onChange={(e)=>setEmail(e.target.value)} fullWidth/>
            <TextField id="outlined-basic" label="Enter Username" variant="outlined" className="username" onChange={(e)=>setName(e.target.value)} fullWidth/>
            <TextField id="outlined-basic" label="Enter Password" variant="outlined" className="password" type='password' onChange={(e)=>setPassword(e.target.value)} fullWidth/>


              <Box sx={{ display: "flex", gap: 2, mt: 2 ,width:"250px"}}>
  
  <Button variant="contained" onClick={handleRegister}>
 Register
  </Button>
 <Button variant="contained" onClick={handlelogin}>
Login
  </Button>
  <Button variant="contained" color="error" onClick={handlecancel}>
    Cancel
  </Button>
  {/* </form> */}
</Box>
 </Box>

            {/* right side */}
       <Box
        sx={{
        width: { xs: "100%", md: "50%" },
         height: { xs: "300px", md: "auto" },
        backgroundColor: "#1976d2",
         display: "flex",
          justifyContent: "center",
         alignItems: "center",
        }}>
            <img src='/images/interview.png' alt='login' 
              style={{
    width: "100%",
    height: "100%", 
    objectFit: "contain"
     }}>
            </img>
    </Box>
  </Box>
        </>
    )
}