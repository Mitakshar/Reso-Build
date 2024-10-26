import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className='navbar'>
            
            <h1><a href="/">Reso-Blend</a></h1>
           
            <ul>
                <li>About</li>
                <li>Help</li>
            </ul>
        </nav>
    );
};

export default Navbar;