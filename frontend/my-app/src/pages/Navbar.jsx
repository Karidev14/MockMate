import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import styles from "../styles/styles.css";
import { Features } from './Features';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {Login} from './Login';
import {Register} from "./Register";

export default function Navbar(){
  const navigate = useNavigate();
    return(
        <>
        <AppBar position="static" >
      <Container maxWidth="xl" className='homeAppBar'>
        <Toolbar disableGutters>
       
          <Typography
           component={Link}
            to="/"
            variant="h6"
            noWrap
           
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          Home 
          </Typography>

           {/* <Typography
            variant="h6"
            noWrap
            component={Link}
           to="/working"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 400,
              letterSpacing: '.1.7rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
         Working 
          </Typography> */}

          {/* <Link to="/features" style={{ textDecoration: "none", color: "inherit" }}> */}
           <Typography
            component={Link}
              to="/features"
            variant="h6"
            noWrap
            
            // href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 400,
              letterSpacing: '.1.7rem',
              color: 'inherit',
              textDecoration: 'none',
             
            }}
          >
        Features
          </Typography>
          {/* </Link> */}
          <Typography
            variant="h6"
            noWrap
            
            // href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 400,
              letterSpacing: '.1.7rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
     <img 
  src="/images/logo.png" 
  alt="logo"
  style={{ height: "45px", width: "auto" }}
/>
          </Typography>
          <div className='HomeNavbar'> 
          <Button variant="contained" style={{backgroundColor:"green"}} 
          className='Login'  component={Link} to="/login" >Login</Button>
          </div>
          <div>
           
             <Button variant="contained" className='Register' 
             component={Link} to="/register"
             style={{backgroundColor:"black"}}
             >Register</Button>
             
          </div>
         
        

        </Toolbar>
      </Container>
    </AppBar>

        </>
    )
}