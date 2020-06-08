import React, {useState, useEffect} from 'react'
import {withRouter, NavLink, Link } from 'react-router-dom'
import "./Navbar.css"

let logo = require("./course_logo.png");
let logo2 = require("./course_logo2.png");
let searchBtn = require("./searchBtn.png");
let activeSearchBtn = require("./searchBtnHover.png");
let studyBtn = require("./studyIcon.png");

const Navbar = () =>{

    const [active, setActive] = useState()

    return(

        <div className = "sidenav">
            <div className="project_introduction">
                <img src={logo2} style={{width:'80px'}}></img>
                <div className="logo_text">
                Coursearch
                </div>
            </div>
            <NavLink to="/" className='menuButton' exact={true} activeClassName='is-active'>
                <div id='searchNav' className='iconContainer active '>
                    {/*<i className="navbarIcon fas fa-search"></i>*/}
                    {/*<img src={searchBtn} style={{width:'50px'}}></img>*/}
                    <div className="searchCard"></div>
                    <p>Search</p> 
                </div>
            </NavLink>
            <NavLink to="/studyplan" className='menuButton' activeClassName='is-active'>
            <div id='studyNav' className='iconContainer'>
                {/*<img src={studyBtn} style={{width:'60px'}}></img>*/}
                <div className="studyCard"></div>
                    <p>Studyplan</p> 
                </div>
            </NavLink>
        
        </div>
          
    )
} 

export default withRouter(Navbar)