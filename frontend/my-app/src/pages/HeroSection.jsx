import React from 'react';
import Button from '@mui/material/Button';
import styles from "../styles/styles.css";
import { useNavigate } from 'react-router-dom';
export function HeroSection(){
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate("/login");
  }
    return(
        <>
         {/* hero section */}
        <div className='heroDiv'>
            <div className='heroDiv1'>
                 <h2>
             "Practice Interviews with AI & Get Instant Feedback"
             </h2>
           </div>
         
          <div className='heroDiv2'>
              <h5>
            Improve technical, HR, and coding skills with real-time AI evaluation.
             </h5>
           </div>
        
           <div className='heroDiv3'>
             <Button variant="contained" onClick={handleClick}>Start Mock Interview</Button>
              <Button variant="contained">Watch Demo</Button>
            </div>
         </div>
        
       
        </>
    )
}