import React, {useState, useEffect} from 'react'
import {withRouter, NavLink, Link } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () =>{


    return(

        <div className = "sidenav">
            <NavLink to="/" className='menuButton' exact={true} activeClassName='is-active'>
                <div id='searchNav' className='iconContainer active'>
                    <i className="navbarIcon fas fa-search"></i>
                    <p>Search</p> 
                </div>
            </NavLink>
            <NavLink to="/studyplan" className='menuButton' activeClassName='is-active'>
            <div id='studyNav' className='iconContainer'>
                    <i class="navbarIcon fas fa-graduation-cap"></i>
                    <p>Studyplan</p> 
                </div>
            </NavLink>
        
        </div>
          
    )
} 

export default withRouter(Navbar)