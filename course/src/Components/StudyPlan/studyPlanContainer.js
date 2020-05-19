import React, {useState,useRef, useReducer, useEffect, useContext} from "react";
import Sunburst from "./sunburst";
import BachelorForm from "./bachelorForm"
import NavBar from '../Navbar'
import {useFetchCourses} from '../../Data/useFetchCourses'
import StudyplanContext from '../../store'
import {ProgressBarContainer} from './progressbar'
import {RadarChart} from './radarChart/radarChart'
import "./bachelorForm.css"


const StudyPlanContainer = () => {
    const contextValue = useContext(StudyplanContext);


    return(
        <>

        <NavBar></NavBar>
        <div className="studyplanAll">
            <div className="bachelorContainer">
                <div className="sunburstContainerH1">
                    <div id="headline">YOUR STUDYPLAN</div>
                    <ul>
                        <span>An overview of your education - make sure your education takes you where you want to be
                        </span>
                    </ul>
                </div>
                <div className="sunburstContainerForm">
                    <BachelorForm></BachelorForm>
                </div>
            </div>
            <div className="progressbarContainer">
            <ProgressBarContainer></ProgressBarContainer>
            </div>
            <div className="sunburstContainer">
            <Sunburst></Sunburst>
            </div>
            <div className="radarChartContainer">
            <RadarChart></RadarChart>
            </div>
        </div>
        

        </>
    )

}

export default StudyPlanContainer
