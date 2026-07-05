import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { useLocation } from "react-router-dom";
export default function InterviewSetup() {
  const location=useLocation();
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "",
    role: location.state?.role || "",
    difficulty: location.state?.difficulty|| "",
    questions: "",
    mode: "",
    timer: "",
  });
  

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleStart = async() => {
    const response= await fetch("http://localhost:5000/generate-questions",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        role:formData.role,
        difficulty:formData.difficulty,
        count:Number(formData.questions)
      })
    });
    const data = await response.json();
    console.log(data.questions);
    console.log("Selected Questions:", formData.questions);
    // console.log("Interview Config:", formData);
    // alert("Interview Started!");
    console.log("select mode",formData.mode);
    navigate("/interviewsession",{
      state:{
        questions:data.questions,
      mode:formData.mode,
       timer: formData.timer,
      role:formData.role,
    difficulty:formData.difficulty}
    });
    // Here you can navigate to interview page
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 700,
          backgroundColor: "#fff",
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          Interview Setup
        </Typography>

        <Grid container spacing={3}>
          {/* Interview Type */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Interview Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                label="Interview Type"
              >
                <MenuItem value="technical">Technical</MenuItem>
                <MenuItem value="hr">HR</MenuItem>
                <MenuItem value="behavioral">Behavioral</MenuItem>
                <MenuItem value="mixed">Mixed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Role */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Role / Technology"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </Grid>

          {/* Difficulty */}
          <Grid item xs={12}>
            <Typography>Difficulty Level</Typography>
            <RadioGroup
              row
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <FormControlLabel
                value="beginner"
                control={<Radio />}
                label="Beginner"
              />
              <FormControlLabel
                value="intermediate"
                control={<Radio />}
                label="Intermediate"
              />
              <FormControlLabel
                value="advanced"
                control={<Radio />}
                label="Advanced"
              />
            </RadioGroup>
          </Grid>

          {/* Number of Questions */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Number of Questions</InputLabel>
              <Select
                name="questions"
                value={formData.questions}
                onChange={handleChange}
                label="Number of Questions"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Mode */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Interview Mode</InputLabel>
              <Select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                label="Interview Mode"
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="voice">Voice</MenuItem>
                <MenuItem value="video">Video</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Timer */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Timer (Minutes)</InputLabel>
              <Select
                name="timer"
                value={formData.timer}
                onChange={handleChange}
                label="Timer"
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Start Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleStart}
              sx={{ mt: 2 }}
            >
              Start Interview
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}