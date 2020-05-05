import React, { useState, useEffect, useRef, createContext } from "react";
import ReactDOM from "react-dom";
import * as d3 from 'd3'
import Sunburst from "../Components/StudyPlan/sunburst";
import NavBar from "../Components/Navbar"
import {createDataset} from './dataset_bachelor'
import { useFetchCourses } from "./useFetchCourses";
import StudyPlanContainer from "../Components/StudyPlan/studyPlanContainer";

const empty_dataset = ()=>{
  var dataset = {}

 let bachelor_courses = { 
  year1P1: [{name:'123', courseName:'test', size:4}], year1P2: [], year1P3: [], year1P4: [],
  year2P1: [], year2P2: [], year2P3: [], year2P4: [],
  year3P1: [], year3P2: [], year3P3: [{name:'5674', courseName:'test2', size:7}], year3P4: [],
  year4P1: [], year4P2: [], year4P3: [], year4P4: [],
  year5P1: [], year5P2: [], year5P3: [], year5P4: [],
}

  var year1_periods = [{name: 'P1', children: bachelor_courses.year1P1}, {name: 'P2', children: bachelor_courses.year1P2}, {name: 'P3', children: bachelor_courses.year1P3}, {name: 'P4', children: bachelor_courses.year1P4}]
  var year2_periods = [{name: 'P1', children: bachelor_courses.year2P1}, {name: 'P2', children: bachelor_courses.year2P2}, {name: 'P3', children: bachelor_courses.year2P3}, {name: 'P4', children: bachelor_courses.year2P4}]
  var year3_periods = [{name: 'P1', children: bachelor_courses.year3P1}, {name: 'P2', children: bachelor_courses.year3P2}, {name: 'P3', children: bachelor_courses.year3P3}, {name: 'P4', children: bachelor_courses.year3P4}]
  var year4_periods = [{name: 'P1', children: bachelor_courses.year4P1}, {name: 'P2', children: bachelor_courses.year4P2}, {name: 'P3', children: bachelor_courses.year4P3}, {name: 'P4', children: bachelor_courses.year4P4}]
  var year5_periods = [{name: 'P1', children: bachelor_courses.year5P1}, {name: 'P2', children: bachelor_courses.year5P2}, {name: 'P3', children: bachelor_courses.year5P3}, {name: 'P4', children: bachelor_courses.year5P4}]

  var bachelor_years = [{name: 'year1', children: year1_periods}, {name: 'year2', children: year2_periods}, {name: 'year3', children: year3_periods}]
  var master_years = [{name: 'year4', children: year4_periods}, {name: 'year5', children: year5_periods}]

  dataset.name = 'all courses'
  dataset.children = [{name: 'bachelor', children: bachelor_years}, {name:'master', children: master_years}]
  //dataset.name = 'bachelor'
  //dataset.children = bachelor_years

return dataset
}


export const studyPlanContext = createContext({})


const DataSunburst = () =>{
  const [page, setPage] = useState(1);
  const [Courses, setCourses] = useState([]);
  const [Prog_course, setProg_course] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nodeData,setNodeData] = useState({});


  const proxy = 'https://cors-anywhere.herokuapp.com/'

  const urlProg = 'http://api.kth.se/api/kopps/v2/programme/academic-year-plan/CMETE/HT16'

  var fetched_courses = [];
  var fetched_schools = [];
  var course_details = [];
  var dataset = {};
  var course_list = []
  var prog_list = []
  var dataset_list = []
  //const nodeData = null
  

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
  prog_list = empty_dataset()
  console.log(prog_list)


  return (
    <studyPlanContext.Provider value ={prog_list}>
      <StudyPlanContainer>

      </StudyPlanContainer>
    </studyPlanContext.Provider>
    /*
    <React.Fragment>
    <NavBar></NavBar>
    <Sunburst {...prog_list}></Sunburst>
    </React.Fragment>
    */
  );
}

export default DataSunburst