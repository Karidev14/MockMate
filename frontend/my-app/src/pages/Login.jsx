import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from "../styles/styles.css";
import Box from "@mui/material/Box";
import {  useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
export default function Login(){
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const navigate=useNavigate();
 

  const handleLogin=async ()=>{
     const response = await fetch("http://localhost:5000/login",{
     method:"POST",
      headers:{
      "Content-Type":"application/json"
     },
     body:JSON.stringify({email,password})
    });
    const data = await response.json();
    console.log("login response",data);
    if(data.token){
    localStorage.setItem("token",data.token);
    localStorage.setItem("userName",data.user.name);
       navigate("/dashboard");
       console.log("TOKEN SAVED:", data.token);
    }else{
      alert(data.message||"login failed");
    }
    };

    const handlecancel=()=>{
      navigate("/");
    }
    return (
        <>
        {/* <form onSubmit={handleSubmit}> */}

    
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
          <h2>Please Log In</h2>
            <TextField id="outlined-basic" 
            label="Enter Email" variant="outlined" className="username" 
            onChange={e=> setEmail(e.target.value)} fullWidth/>
            <TextField id="outlined-basic" 
            label="Enter Password" variant="outlined" 
            className="password" onChange={e=>setPassword(e.target.value)}  fullWidth/>


              <Box sx={{ display: "flex", gap: 2, mt: 2 ,width:"250px"}}>
  <Button variant="contained" onClick={handleLogin}>
    Login
  </Button>

  <Button variant="contained" color="error" onClick={handlecancel}>
    Cancel
  </Button>
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
    height: "100%",   // 👈 reduce height here
    objectFit: "contain"
     }}>
            </img>
    </Box>
   
  </Box>
  

         {/* </form> */}
             
  
        </>
    )
   
}
  Login.propTypes ={
    setToken: PropTypes.func.isRequired
  }