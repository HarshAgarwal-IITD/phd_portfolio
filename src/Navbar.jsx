// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';


function  Navbar(){
  return (
    
    <nav style={{
        alignContent:'centre',
      display: 'flex',               // Flexbox for horizontal alignment
      justifyContent: 'center',      // Center the items
      backgroundColor: '#f4f4f4',
      padding: '1rem',
      borderBottom: '1px solid #ccc', // Optional border for separation
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add slight shadow for elevation
      
    }}>
      <Link to="/" style={{ margin: '0 1rem', textDecoration: 'none', color: '#333' }}>About</Link>
      <Link to="/background" style={{ margin: '0 1rem', textDecoration: 'none', color: '#333' }}>Background</Link>
      <Link to="/research" style={{ margin: '0 1rem', textDecoration: 'none', color: '#333' }}>Research</Link>
      <Link to="/publications" style={{ margin: '0 1rem', textDecoration: 'none', color: '#333' }}>Publications</Link>
      <Link to="/teaching" style={{ margin: '0 1rem', textDecoration: 'none', color: '#333' }}>Teaching</Link>
      <Link to="/projects" style={{ margin: '0 1rem', textDecoration: 'none', color: '#333' }}>Projects</Link>
      <Login></Login>
    </nav>
   
  );
  
};

export default Navbar;
