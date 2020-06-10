import React, {useState,useRef, useReducer, useEffect, createContext, useContext} from "react";
import {Card, Icon, Image} from 'semantic-ui-react'
import Sunburst from "./sunburst";
import BachelorForm from "./bachelorForm"
import NavBar from '../Navbar'
import {useFetchCourses} from '../../Data/useFetchCourses'
import StudyplanContext from '../../store'
import {ProgressBarContainer} from './progressbar'
import {RadarChart} from './radarChart/radarChart'
import "./bachelorForm.css"
import {studyplanReducer,initialstate} from "../../reducers/studyplanReducer"

var one = require('./../HowItWorks/one.png')
var two = require('./../HowItWorks/two.png')
var three = require('./../HowItWorks/three.png')

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
                    <span id='headline3'>Start planning and customizing your educational path by adding your bachelor, master and elective courses to the study plan.</span>
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
                <div className='noDataContainer'>
                    {/*EMPTY*/}
                    <i className='emptyText' style={{marginBottom:'20px', fontSize:'12px' }}>
                        Your study plan is currently empty, start adding courses to plan your education!</i>
                        <div className='guideContainer'>
  
  <div className='aboutContainer'>
    <div className='imageDiv'>
      <img className='responsive' src={one} wrapped ui={false} />
      <Card.Content>
        <Card.Header className='hw_headline'><strong>Add bachelor courses</strong></Card.Header>
        <Card.Meta>
          <p className='hw_date'>
          Select a bachelor program and the starting year to add all bachelor courses to the study plan automatically. 
          If needed, you can remove and/or move courses later.
          </p>
        </Card.Meta>
      </Card.Content>
    </div>

    <div className='imageDiv'>
      <img
        className='responsive'
        id='image'
        src={two}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header className='hw_headline'><strong>Search for courses</strong></Card.Header>
        <Card.Meta>
          <p className='hw_date'>
          Use the search function to find master-, track specific-, or elective courses of your interest. 
          Click on a course to get detailed information about the course and to add it to your study plan.
          </p>
        </Card.Meta>
      </Card.Content>
    </div>

    <div className='imageDiv'>
      <img
        className='responsive'
        src={three}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header className='hw_headline'><strong>Get an overview</strong></Card.Header>
        <Card.Meta>
          <p className='hw_date'>
          In the study plan you get an overview of your education.
          Click on a year or period to discover the covered subjects and the sum of credits.
          Click on a course to move or remove it.
          </p>
        </Card.Meta>
      </Card.Content>
    </div>
  </div>
</div>
                
                </div>
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
