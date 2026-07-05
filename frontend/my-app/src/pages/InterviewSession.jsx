import { LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState,useRef } from 'react';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
export default function InterviewSession(){
    const navigate = useNavigate();
    const location =useLocation();
   const questions= location.state?.questions || [];
   const mode=location.state?.mode || "text";
   const [currIndex,setCurrentIndex]=useState(0);
   const [answers,setAnswers]=useState([]);
   const [timeLeft,setTimeLeft]=useState(60);
  
   const [currentQuestion,setCurrentQuestion]=useState(0);
   const totalQuestions=questions.length;
    // video camera
    const videoRef=useRef(null);
   const speakQuestion=(text)=>{
    const speech= new SpeechSynthesisUtterance(text);
    speech.lang='en-US';
    speech.rate=1;
    window.speechSynthesis.speak(speech);
   };
   const startListening =()=>{
    const SpeechRecognition=
       window.SpeechRecognition || window.webkitSpeechRecognition;
       
       if(!SpeechRecognition){
        alert("Speech Recognition not supported in this brower");
        return;
       }

       const recognition=new SpeechRecognition();
       recognition.lang ="en-US";
       recognition.continuous=false;
       recognition.interimResults=false;
       recognition.start();

       recognition.onstart=()=>{
        console.log("listening");
       };
       recognition.onresult=(event)=>{
        const transcript=event.results?.[0]?.[0]?.transcript;
        if(transcript){
          setAnswers((prev)=>{
            const updated=[...prev];
            updated[currIndex]=transcript;
            return updated;
          });
        }
        // console.log("You said",transcript);
        // setAnswers(transcript);
       };
       recognition.onerror=(event)=>{
        console.log("Error",event.error);
       };
       recognition.onend=()=>{
        console.log("Stopping Listening");
       };
   };
//    timer logic
    useEffect(()=>{
        if(timeLeft <=0){
          if(currIndex < totalQuestions -1){
            handleNext();
          }else{
            handleSubmit();
          }
          return;
        }
        const timer=setTimeout(()=>{
            setTimeLeft(prev=> prev-1);
        },1000);
        return ()=>clearTimeout(timer);
    },[timeLeft]);
   

    // camera useeffect
    useEffect(()=>{
      if(mode==="video"){
        navigator.mediaDevices
        .getUserMedia({video:true,audio:true})
        .then((stream)=>{
          if(videoRef.current){
            videoRef.current.srcObject=stream;
          }
        })
        .catch((err)=>{
          console.log("camera error",err);
        });
      }
    },[mode]);
    const handleNext=()=>{
        if(currIndex < totalQuestions -1){
            setCurrentIndex(currIndex +1);
            setTimeLeft(60);
        }
    };
    const handleSubmit = async () => {
      console.log("final answer:",answers);

  try 
  {
    const evalRes=await fetch("http://localhost:5000/evaluate",{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({questions,answers})
    });
    
    const result= await evalRes.json();
     // 2. Get token from localStorage
   const token = localStorage.getItem("token");

     await fetch("http://localhost:5000/save-interview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        role: location.state?.role,
        difficulty: location.state?.difficulty,
        questions,
        answers,
        score: result.overallScore,
        feedback: result
      })
    });
   alert("interview saved!")
    navigate("/dashboard", { state: result });

  } catch (err) {
    console.log("Submit error:", err);
  }
};

    useEffect(()=>{
      if( (mode === "voice" || mode ==="video")&&  questions.length>0){
        speakQuestion(questions[currIndex]);
      }
    }, [mode,currIndex,questions]);

    return(
        <>
         <Box
      sx={{
        minHeight: "100vh",
        p: 3,
        backgroundColor: "#f4f6f8",
      }}
    >
          {/* Progress */}
      <Typography variant="h6">
        Question {currIndex + 1} / {totalQuestions}
      </Typography>

      <LinearProgress
      variant='determinate'
      value={((currIndex +1)/totalQuestions)*100}
      sx={{my:2}}/>

      {/* timer */}
      <Typography color='error' sx={{mb:2}}>
        Time Left:{timeLeft}s
      </Typography>
     
     {/* Question Card */}
     <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant='h6'>
            {questions[currIndex]}
        </Typography>
     </Paper>
    
    {mode === "video" && (
      <Box sx={{mb:2}}>
        <video 
        ref={videoRef} 
        autoPlay
        playsInline
        width="300"
        style={{borderRadius: "10px"}}/>

        
        </Box>
    )}
       {/* Answer Box */}
    {mode ==="text" && (   <TextField
        fullWidth
        multiline
        rows={5}
        placeholder="Type your answer here..."
        value={answers[currIndex] || ""}
       
        onChange={(e)=>{
          const updated=[...answers];
          updated[currIndex]=e.target.value;
          setAnswers(updated);
        }}
      />
    )}
     
       {/* Buttons */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button variant='contained' onClick={()=>{
          // setVoiceMode(true)
        }}>Start voice Interview</Button>

       {mode ==="voice" && (
        <>
         <Button variant='contained' 
         onClick={startListening}>
          Speak Answer
        </Button>
        <TextField fullWidth
        multiline
        rows={5}
        value={answers[currIndex] || ""}/>
        </>
       )}

       
        {currIndex < totalQuestions - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>

         
        ) : (
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit Interview
          </Button>
        )}
      </Box>
    </Box>
        </>
    );
}