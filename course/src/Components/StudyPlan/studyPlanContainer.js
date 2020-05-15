import React, {useState,useRef, useReducer, useEffect, useContext} from "react";
import Sunburst from "./sunburst";
import BachelorForm from "./bachelorForm"
import NavBar from '../Navbar'
import {useFetchCourses} from '../../Data/useFetchCourses'
import StudyplanContext from '../../store'
import "./bachelorForm.css"


const StudyPlanContainer = () => {
    const contextValue = useContext(StudyplanContext);


    return(
        <>

        <NavBar></NavBar>
        <div className="sunburstContainer">
            <div className="sunburstContainerH1">
            <h1>STUDYPLAN</h1>
            </div>
            <div className="sunburstContainerForm">
            <BachelorForm></BachelorForm>
            </div>
        </div>

        <Sunburst></Sunburst>
        

        </>
    )

}

export default StudyPlanContainer
