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
    const isEmpty = (data) =>{
        const course_array = []
        data.children.map(part =>{
            part.children.map(year =>{
                year.children.map(period =>{
                    period.children.map(course=>{
                        course_array.push(course)
                    })
                })
            }) //children t bach eller master
        })
        if(course_array.length == 0){
            return true
        }
        else{
            return false
        }
    }

    return(
        <>
  {/*  <BachelorNameContext.Provider value={{BachelorName, setBachelorName}}>*/}
    <ZoomedInContext.Provider value={{ZoomedData, setZoomedData}}>

        <NavBar></NavBar>
        <div className="studyplanAll">
            <div className="bachelorContainer">
                <div className="sunburstContainerH1">
                    <div id="headline">YOUR STUDY PLAN</div>
                    <ul>
                        <span id="headline2">An overview of the composition of courses, credits and covered subjects in your education </span>
                    </ul>
                    <ul>
                    <span id='headline3'>Start planning and customizing your educational path by adding your bachelor-, master- and elective courses to the study plan.</span>
                    </ul>
                </div>
                {isEmpty(contextValue[0]) ? null:
                <div className="chosenBachelor">
                    <div className='bachelorHeadline'>Chosen bachelor:</div>
                {initialstate.children[0].bachelor_name}, {initialstate.children[0].start_year}
                </div>
                    }
                <div className="sunburstContainerForm">
                    <BachelorForm></BachelorForm>
                </div>
            </div>
            <div className="notTopBar">

            {isEmpty(contextValue[0]) ? 
                <div className='noDataContainer'>EMPTY</div>
                :
                <>
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
            </>
            }
            </div>
        </div>

    </ZoomedInContext.Provider>
 {/*   </BachelorNameContext.Provider>*/}
        

        </>
    )

}

export default StudyPlanContainer
