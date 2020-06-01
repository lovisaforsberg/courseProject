import React, {useState,useRef, useReducer, useEffect, createContext, useContext} from "react";
import Sunburst from "./sunburst";
import BachelorForm from "./bachelorForm"
import NavBar from '../Navbar'
import {useFetchCourses} from '../../Data/useFetchCourses'
import StudyplanContext from '../../store'
import {ProgressBarContainer} from './progressbar'
import {RadarChart} from './radarChart/radarChart'
import "./bachelorForm.css"

export const ZoomedInContext = createContext({})
export const BachelorNameContext = createContext({})


const StudyPlanContainer = () => {
    const contextValue = useContext(StudyplanContext);

    const [ZoomedData, setZoomedData] = useState(contextValue[0])
    const [BachelorName, setBachelorName] = useState(JSON.parse(localStorage.getItem("nameData"))||"")
    console.log(contextValue[0])

    /*useEffect(()=>{
        localStorage.setItem("nameData", JSON.stringify(BachelorName))
    },[])*/

    return(
        <>
    <BachelorNameContext.Provider value={{BachelorName, setBachelorName}}>
    <ZoomedInContext.Provider value={{ZoomedData, setZoomedData}}>

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
            <div className="bachelorNameContainer">
                {BachelorName}
            </div>
            <div className="progressbarContainer">
            <ProgressBarContainer></ProgressBarContainer>
            </div>
            <div className='sunBurstRadar'>
                <div className="sunburstContainer">
                <Sunburst></Sunburst>
                </div>
                <div className="radarChartContainer">
                <RadarChart></RadarChart>
                </div>
            </div>
            
        </div>

    </ZoomedInContext.Provider>
    </BachelorNameContext.Provider>
        

        </>
    )

}

export default StudyPlanContainer
