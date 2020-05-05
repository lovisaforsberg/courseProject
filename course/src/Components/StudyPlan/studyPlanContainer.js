import React, {useState,useRef, useReducer, useEffect, useContext} from "react";
import Sunburst from "./sunburst";
import NavBar from '../Navbar'
import {studyPlanContext} from "../../Data/dataSunburst"

//changing the dataset

const StudyPlanContainer = () => {
    //let sunBurstData = useContext(studyPlanContext)
    //console.log(sunBurstData[0])
    //let dataprops = sunBurstData[0]

    return(
        <>
        <NavBar></NavBar>
        <Sunburst></Sunburst>
        </>
    )

}

export default StudyPlanContainer
