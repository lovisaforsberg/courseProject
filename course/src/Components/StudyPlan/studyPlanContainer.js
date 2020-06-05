import React, {useState,useRef, useReducer, useEffect, createContext, useContext} from "react";
import Sunburst from "./sunburst";
import BachelorForm from "./bachelorForm"
import NavBar from '../Navbar'
import {useFetchCourses} from '../../Data/useFetchCourses'
import StudyplanContext from '../../store'
import {ProgressBarContainer} from './progressbar'
import {RadarChart} from './radarChart/radarChart'
import "./bachelorForm.css"
import {studyplanReducer,initialstate} from "../../reducers/studyplanReducer"

export const ZoomedInContext = createContext({})
//export const BachelorNameContext = createContext({})


const StudyPlanContainer = () => {
    const contextValue = useContext(StudyplanContext);

    const [ZoomedData, setZoomedData] = useState(contextValue[0])
    //const [BachelorName, setBachelorName] = useState("")
    console.log(contextValue[0])
    //const useStudyplanReducer= useReducer(studyplanReducer,initialstate)
/*
    useEffect(()=>{
        localStorage.setItem("nameData", JSON.stringify(BachelorName))
        setBachelorName(JSON.parse(localStorage.getItem("nameData")))
        console.log(JSON.parse(localStorage.getItem("nameData")))
    },[useStudyplanReducer])*/

    return(
        <>
  {/*  <BachelorNameContext.Provider value={{BachelorName, setBachelorName}}>*/}
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
            <div className="notTopBar">
            <div className="bachelorNameContainer">
                {/*BachelorName*/}
                {initialstate.children[0].bachelor_name}
            </div>
            <div className="progressbarContainer">
                <div className="progBarHeadline">Sum of credits</div>
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
        </div>

    </ZoomedInContext.Provider>
 {/*   </BachelorNameContext.Provider>*/}
        

        </>
    )

}

export default StudyPlanContainer
