import React, {useState, useEffect} from 'react'
import {withRouter, NavLink, Link } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () =>{

    return(

        <div className = "sidenav">
            <NavLink to="/" className='menuButton'>
                Search
            </NavLink>
            <NavLink to="/studyplan" className='menuButton'>
                Studyplan
            </NavLink>
        
        </div>
          
    )
} 

export default withRouter(Navbar)