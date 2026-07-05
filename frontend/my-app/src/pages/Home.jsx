import React from 'react';

import { Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from './Navbar.jsx';
import Footer from '../pages/Footer.jsx';
import { HeroSection } from './HeroSection.jsx';
import Features from './Features.jsx';
export function Home(){
    

    return (
        <>
        <Navbar/> 
        <HeroSection/>
             <div>
      </div>
      <Footer/>
        
  </>
    )
}
