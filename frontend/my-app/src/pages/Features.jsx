
import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import InsightsIcon from "@mui/icons-material/Insights";

export default function Features() {
  const features = [
    {
      icon: <PsychologyIcon sx={{ fontSize: 50, color: "#1976d2" }} />,
      title: "AI Question Generation",
      desc: "Generate smart interview questions based on role and difficulty using AI."
    },
    {
      icon: <MicIcon sx={{ fontSize: 50, color: "#1976d2" }} />,
      title: "Voice Interview",
      desc: "Answer questions using speech recognition for real interview experience."
    },
    {
      icon: <VideocamIcon sx={{ fontSize: 50, color: "#1976d2" }} />,
      title: "Video Interview",
      desc: "Simulate real-world interviews using camera and microphone."
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 50, color: "#1976d2" }} />,
      title: "AI Feedback & Analytics",
      desc: "Get detailed feedback, scores, and performance insights instantly."
    }
  ];

  return (
    <Box sx={{ py: 8, px: 3, backgroundColor: "#f9fafc" }}>
      
      {/* Section Title */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Powerful Features
      </Typography>

      <Typography align="center" sx={{ mb: 5, color: "gray" }}>
        Everything you need to prepare for your next interview
      </Typography>

      {/* Feature Cards */}
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                borderRadius: 4,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                
                {/* Icon */}
                <Box mb={2}>{feature.icon}</Box>

                {/* Title */}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {feature.title}
                </Typography>

                {/* Description */}
                <Typography variant="body2" color="text.secondary">
                  {feature.desc}
                </Typography>

              </CardContent>
            </Card>

          </Grid>
        ))}
      </Grid>
    </Box>
  );
}