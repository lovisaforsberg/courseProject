import React, {useState,useRef, useReducer, useEffect, useContext} from "react";
import Sunburst from "./sunburst";
import NavBar from '../Navbar'
import {studyPlanContext} from "../../Data/dataSunburst"



const StudyPlanContainer = () => {
    let sunBurstData = useContext(studyPlanContext)


    return(
        <>
        <NavBar></NavBar>
        <Sunburst {...sunBurstData}></Sunburst>
        </>
    )

}

export default StudyPlanContainer
