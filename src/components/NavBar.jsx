import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {ROUTER} from "../constant/router"
import { useLocation } from 'react-router-dom';
import "../index.css"
const NavBar = () => {
  const {pathname} = useLocation();
  return (

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
             <Link to={ROUTER.Home}>React Query</Link> 
            </Typography>
            <Link to={ROUTER.Home}  className={`text-3xl mr-10 font-semibold ${pathname === ROUTER.Home ? "text-red-300" : "text-white"}`}>Table</Link>
            <Link to={ROUTER.AddUser} className={`text-3xl mr-12 font-semibold ${pathname === ROUTER.AddUser ? "text-red-300" : "text-white"}`}>Add User</Link>
          </Toolbar>
        </AppBar>
      </Box>
   
  );
};

export default NavBar;
