import React, {useState,useRef, useReducer, useEffect, useContext} from "react";
import Sunburst from "./sunburst";
import NavBar from '../Navbar'
import {studyPlanContext} from "../../Data/dataSunburst"

//changing the dataset

const StudyPlanContainer = () => {
    let sunBurstData = useContext(studyPlanContext)

    //reducer add/remove courses

    //add function = call action add
    //remove function = call action remove
    return(
        <>
        <NavBar></NavBar>
        <Sunburst {...sunBurstData}></Sunburst>
        </>
    )

}

export default StudyPlanContainer
