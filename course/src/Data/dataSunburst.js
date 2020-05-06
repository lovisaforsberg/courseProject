import React, { useState, useEffect, useReducer, createContext } from "react";
import ReactDOM from "react-dom";
import * as d3 from 'd3'
import Sunburst from "../Components/StudyPlan/sunburst";
import NavBar from "../Components/Navbar"
import {createDataset} from './dataset_bachelor'
import { useFetchCourses } from "./useFetchCourses";
import StudyPlanContainer from "../Components/StudyPlan/studyPlanContainer";


/*
export const StudyPlanContext = createContext({})


const DataSunburst = () =>{
  const [Prog_course, setProg_course] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const urlProg = 'http://api.kth.se/api/kopps/v2/programme/academic-year-plan/CMETE/HT16'

  //var prog_list = []
  //var dataset_list = []
  /*
  async function fetchAll() {
   // const response = await fetch(proxy+url);
    const response2 = await fetch(proxy+urlProg);
   // const courses_json = await response.json();
    const prog_json = await response2.json();
    setProg_course(prog_json.Specs);
   // setCourses(courses_json);
    setIsLoading(false);  

    //prog_list = prog_json.Specs;
    //createDataset(prog_list)
    //console.log(Prog_course)
    //console.log(courses_json);
  }


  
  
    useEffect(()=>{
        fetchAll()
        setProg_course(Prog_course);    
        
  }
  

  ,[]);
  //prog_list = createDataset(Prog_course)
  const initialstate = empty_dataset()
  console.log(initialstate)
  
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_COURSE': 
        addCourse();
        return state;
      case 'DELETE_COURSE':
        deleteCourse();
        return state;
      default:
        return state;
    }
  };


  const addCourse = () =>{
    console.log("Adding course!")
  }

  const deleteCourse = () =>{
    console.log("Deleting course!")
  }

  const contextValue = useReducer(reducer, initialstate);

  return (
    <StudyPlanContext.Provider value ={contextValue}>
      <StudyPlanContainer>
      </StudyPlanContainer>
    </StudyPlanContext.Provider>
    /*
    <React.Fragment>
    <NavBar></NavBar>
    <Sunburst {...prog_list}></Sunburst>
    </React.Fragment>
    */
   /*
  );
}

export default DataSunburst*/