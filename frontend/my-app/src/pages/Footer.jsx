import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FaCopyright } from "react-icons/fa";
import styles from "../styles/styles.css";
export default function Footer(){
    return(
        <>
         {/* footer section */}
        <div className='footer'>
            <a href='/' style={{margin:'1.5rem'}}><FaCopyright size={20}/> 2026 AI Interview Platform. All rights reserved.</a>
            <a href='/' style={{margin:'1.5rem' }} > <FaLinkedin   size={30}/> </a>
             <a href='/'  style={{margin:'1.5rem'}}>Contact Us</a>
                <a href='/'>Email: support@aiinterview.com</a>
                
        </div>
        </>
    )
}