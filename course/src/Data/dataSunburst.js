import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as d3 from 'd3'
import Sunburst from "../Components/sunburst";



const DataSunburst = () =>{
  const [page, setPage] = useState(1);
  const [Courses, setCourses] = useState([]);
  const [Prog_course, setProg_course] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nodeData,setNodeData] = useState({});

  const d3Container = useRef(null)


  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const url = 'https://api.kth.se/api/kopps/v2/courses?l=en'
  const urlSchools = 'https://api.kth.se/api/kopps/v2/schools'
  const urlCourse = 'https://api.kth.se/api/kopps/v2/course/'
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


  const createDataset = (list) =>{
    //for now
    let track = "VLM"

    let bachelor_courses = { year1P1: [], year1P2: [], year1P3: [], year1P4: [],
                    year2P1: [], year2P2: [], year2P3: [], year2P4: [],
                    year3P1: [], year3P2: [], year3P3: [], year3P4: [],}

      list.forEach(element => {
           element.Electivity[0].Courses.forEach(course =>{
               if("ConnectedRound" in course){
                //if(!("SpecCode" in element)){
                if(element.SpecCode === track || !("SpecCode" in element)){
                //course.ConnectedRound.periodInfos.forEach(period =>{
                  if(element.StudyYear === 1){
                       if("P1" in course.ConnectedRound){bachelor_courses.year1P1.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P1']})}
                       if("P2" in course.ConnectedRound){bachelor_courses.year1P2.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P2']})}
                       if("P3" in course.ConnectedRound){bachelor_courses.year1P3.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P3']})}
                       if("P4" in course.ConnectedRound){bachelor_courses.year1P4.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P4']})}
                  }
                  if(element.StudyYear === 2){
                    if("P1" in course.ConnectedRound){bachelor_courses.year2P1.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P1']})}
                    if("P2" in course.ConnectedRound){bachelor_courses.year2P2.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P2']})}
                    if("P3" in course.ConnectedRound){bachelor_courses.year2P3.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P3']})}
                    if("P4" in course.ConnectedRound){bachelor_courses.year2P4.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P4']})}
                  }
                  if(element.StudyYear === 3){
                    
                      if("P1" in course.ConnectedRound){bachelor_courses.year3P1.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P1']})}
                      if("P2" in course.ConnectedRound){bachelor_courses.year3P2.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P2']})}
                      if("P3" in course.ConnectedRound){bachelor_courses.year3P3.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P3']})}
                      if("P4" in course.ConnectedRound){bachelor_courses.year3P4.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P4']})}
                    
                  }
                  
              // })
              }
           }
           })
        
    
      });
      //console.log(bachelor_courses.year1P1)
     // console.log(bachelor_courses)
    /*  const years = [{name: 'year1', children: [bachelor_courses.year1P1, bachelor_courses.year1P2, bachelor_courses.year1P3, bachelor_courses.year1P4]}, 
                      {name: 'year2', children: [bachelor_courses.year2P1, bachelor_courses.year2P2, bachelor_courses.year2P3, bachelor_courses.year2P4]}, 
                      {name: 'year3', children: [bachelor_courses.year3P1, bachelor_courses.year3P2, bachelor_courses.year3P3, bachelor_courses.year3P4]}]

      dataset.name = 'all_courses';
      dataset.children = [{name: 'bachelor', children: years}, {name: 'master', children: []}];
*/



var periods1 = [{name: 'p1', children: bachelor_courses.year1P1}, {name: 'p2', children: bachelor_courses.year1P2},
                      {name: 'p3', children: bachelor_courses.year1P3}, {name: 'p4', children: bachelor_courses.year1P4},]
      var periods2 = [{name: 'p1', children: bachelor_courses.year2P1}, {name: 'p2', children: bachelor_courses.year2P2},
                      {name: 'p3', children: bachelor_courses.year2P3}, {name: 'p4', children: bachelor_courses.year2P4},]
      var periods3 = [{name: 'p1', children: bachelor_courses.year3P1}, {name: 'p2', children: bachelor_courses.year3P2},
                      {name: 'p3', children: bachelor_courses.year3P3}, {name: 'p4', children: bachelor_courses.year3P4},]
     
var years = [{name: 'Year 1', children: periods1}, 
    {name: 'Year 2', children: periods2}, 
    {name: 'Year 3', children: periods3}]        

     //dataset.name = "all_courses";
     //dataset.children = [{name: 'bachelor', children: years}, {name: 'master', children: []}];
     dataset.name = "bachelor"
     dataset.children = years
    return dataset
  }

  
  
    useEffect(()=>{
        fetchAll()
        setProg_course(Prog_course);    
        
  }
  

  ,[]);
  prog_list = createDataset(Prog_course)


  return (
    <React.Fragment>
    <Sunburst {...prog_list}></Sunburst>
    </React.Fragment>
  );
}

export default DataSunburst