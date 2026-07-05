import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box } from '@mui/material';
export default function Dashboard(){
 const location =useLocation();
 const navigate = useNavigate();
 const result=location.state ||{};
 const userName=localStorage.getItem("userName");
    return(
        <>
       
       <Box p={4}>
        <Typography variant='h4' gutterBottom>
          Welcome {userName || "User"}!
        </Typography>
        <Typography variant='h4' gutterBottom>
          Ready for next Interview?
        </Typography>
 
      <Button variant='contained'
      sx={{mr:2}}
      onClick={()=>navigate("/interviewsetup")}>
        Start New Interview
      </Button>
      
      <Button variant='outlined'
      onClick={()=>navigate("/history")}>
        View Past Interview
      </Button>
       </Box>
        {
          result.questionAnalysis?.map((item,index)=>
          {
           <Card sx={{ minWidth: 275 }} key={index}>
              <CardContent>
                <Typography variant='h2'>
                Question {index +1}
                </Typography>
                <Typography >
                     <strong>Questions: </strong>{item.question} 
                </Typography>
                <Typography variant="h5" component="div">
                   <strong>
                    Score:
                   </strong>{item.score}/10
                </Typography>
                <Typography  variant="h5">
                <strong>Feedback</strong>{item.feedback}
                </Typography>
              </CardContent>
            </Card>
 
          })
        }

        <Card sx={{ mt: 3 }}>
        <CardContent>
    <Typography variant="h6">Strengths</Typography>
    {result.strengths?.map((s, i) => (
      <Typography key={i}>• {s}</Typography>
    ))}
     </CardContent>
    </Card>

      <Card sx={{ mt: 3 }}>
     <CardContent>
    <Typography variant="h6">Weaknesses</Typography>
    {result.weekness?.map((w, i) => (
      <Typography key={i}>• {w}</Typography>
    ))}
    </CardContent>
   </Card>
     <Card sx={{ mt: 3 }}>
  <CardContent>
    <Typography variant="h6">Improvement Suggestions</Typography>
    {result.suggestions?.map((s, i) => (
      <Typography key={i}>• {s}</Typography>
    ))}
  </CardContent>
</Card>
                </>
    )
}

