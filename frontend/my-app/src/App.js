
import './App.css';
import Features  from './pages/Features';
import { Home } from './pages/Home';
import React ,{useState} from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from './pages/Login';
import Register from "./pages/Register";
import InterviewSetup from './pages/InterviewSetup';
import InterviewSession from './pages/InterviewSession';
import Result from './pages/Result';
import Dashboard from './pages/Dashboard';
function App() {
  // const [token,setToken]=useState();
  // if(!token){
  //   return <Login setToken={setToken}/>
  // }
  return (
   <>
 
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/features' element={<Features/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/interviewsetup' element={<InterviewSetup/>}/>
    <Route path='/interviewsession' element={<InterviewSession/>}/>
    <Route path='/history' element={<Result/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
  </Routes>

   </>
  );
}

export default App;
