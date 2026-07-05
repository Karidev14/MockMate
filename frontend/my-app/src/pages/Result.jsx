import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {  useNavigate } from 'react-router-dom';
export default function Result() {
  const [data, setData] = useState([]);
      const navigate=useNavigate();
  const chartData = [
  {
    name: "Good Score",
    value: data.filter(item => item.score >= 5).length
  },
  {
    name: "Low Score",
    value: data.filter(item => item.score < 5).length
  }
];

const COLORS = ["#4caf50", "#f44336"];
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/dashboard-data", {
        headers: {
          Authorization: `Bearer ${token}` // ✅ MUST
        }
      });

      const result = await res.json();
      console.log("History Data:", result); // 👈 CHECK THIS

      setData(result);
    } catch (err) {
      console.log(err);
    }
  };
   const handlecancel=()=>{
      navigate("/");
    }
    const handlesubmit=()=>{
      navigate("/interviewsetup")
    }

  return (

    
    <Box p={4}>

      {data.length > 0 && (
  <PieChart width={400} height={300}>
    <Pie
      data={chartData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={100}
      label
    >
      {chartData.map((entry, index) => (
        <Cell key={index} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
)}
      <Typography variant="h4">Interview History</Typography>

      {/* ✅ If no data */}
      {data.length === 0 ? (
        <Typography mt={2}>No interviews found</Typography>
      ) : (
        data.map((item, index) => (
          <Card key={index} sx={{ mt: 2 }}>
            <CardContent>
              <Typography><strong>Role:</strong> {item.role}</Typography>
              <Typography><strong>Difficulty:</strong> {item.difficulty}</Typography>
              <Typography><strong>Score:</strong> {item.score}</Typography>
              <Typography>
                <strong>Date:</strong>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
       <Button variant="contained" color="primary" onClick={handlesubmit}  >
         Start Interview
        </Button>
       <Button variant="contained" color="error" onClick={handlecancel}>
          Cancel
        </Button>
    </Box>
   
  );
}