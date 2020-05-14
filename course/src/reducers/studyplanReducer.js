//import {empty_dataset} from "../Data/dataSunburst"
import { useState, useEffect } from "react";
import {useFetchCourses} from '../Data/useFetchCourses'
import { cross } from "d3";

const empty_dataset = ()=>{
    var dataset = {}
  
   let courses_per = { 
    year1P1: [{name:'123', courseName:'hejhej', size:6}], year1P2: [], year1P3: [], year1P4: [],
    year2P1: [], year2P2: [], year2P3: [], year2P4: [],
    year3P1: [], year3P2: [], year3P3: [], year3P4: [],
    year4P1: [], year4P2: [], year4P3: [], year4P4: [],
    year5P1: [], year5P2: [], year5P3: [], year5P4: [],
  }
  
    var year1_periods = [{name: 'P1', children: courses_per.year1P1, color: '#DE96C5'}, {name: 'P2', children: courses_per.year1P2, color: '#DE96C5'}, {name: 'P3', children: courses_per.year1P3, color: '#DE96C5'}, {name: 'P4', children: courses_per.year1P4, color: '#DE96C5'}]
    var year2_periods = [{name: 'P1', children: courses_per.year2P1, color: '#D0746A'}, {name: 'P2', children: courses_per.year2P2, color: '#D0746A'}, {name: 'P3', children: courses_per.year2P3, color: '#D0746A'}, {name: 'P4', children: courses_per.year2P4, color: '#D0746A'}]
    var year3_periods = [{name: 'P1', children: courses_per.year3P1, color: '#EDDF6C'}, {name: 'P2', children: courses_per.year3P2, color: '#EDDF6C'}, {name: 'P3', children: courses_per.year3P3, color: '#EDDF6C'}, {name: 'P4', children: courses_per.year3P4, color: '#EDDF6C'}]
    var year4_periods = [{name: 'P1', children: courses_per.year4P1, color: '#83BB93'}, {name: 'P2', children: courses_per.year4P2, color: '#83BB93'}, {name: 'P3', children: courses_per.year4P3, color: '#83BB93'}, {name: 'P4', children: courses_per.year4P4, color: '#83BB93'}]
    var year5_periods = [{name: 'P1', children: courses_per.year5P1, color: '#77B5D5'}, {name: 'P2', children: courses_per.year5P2, color: '#77B5D5'}, {name: 'P3', children: courses_per.year5P3, color: '#77B5D5'}, {name: 'P4', children: courses_per.year5P4, color: '#77B5D5'}]
  
    var bachelor_years = [{name: 'Year 1', children: year1_periods, color:'#CC5BA4'}, {name: 'Year 2', children: year2_periods, color:'#C65649'}, {name: 'Year 3', children: year3_periods, color:'#EAD94C'}]
    var master_years = [{name: 'Year 4', children: year4_periods, color:'#68AD7C'}, {name: 'Year 5', children: year5_periods, color:'#59A5CC'}]
  
    dataset.name = 'all courses'
    dataset.children = [{name: 'bachelor', children: bachelor_years}, {name:'master', children: master_years}]
    //dataset.name = 'bachelor'
    //dataset.children = bachelor_years
  
  return dataset
  }

function courseExist(name, arr) {
  return arr.some(function(el) {
    return el.name === name;
  });
}
  
const addCourse = (course, year, period) =>{

    let level = '';

    if(year == "Year 1" || year == "Year 2" || year == "Year 3"){
        level='bachelor'
    }
    else if(year === "Year 4" || year === "Year 5"){
        level ='master'
    }
 
  var courseObject = {}
  courseObject.name = course.course_code
  courseObject.courseName = course.title
  courseObject.size = course.size
  courseObject.allInfo = course
  
  /*
  else{
    var courseObject = {}
    courseObject.name = course.course_code
    courseObject.courseName = course.title
    courseObject.size = course.size
    courseObject.allInfo = course.allInfo
    console.log(courseObject)
  }
  */

  const obj_lev = initialstate.children.find( ({ name }) => name === level);
  const obj_year = obj_lev.children.find(({name}) => name === year);
  const obj_period = obj_year.children.find(({name}) => name === period);
  //console.log(obj_period)
  if(courseExist(courseObject.name, obj_period.children) === false){
    obj_period.children.push(courseObject)
  }
  else{
    alert('course already exists')
  }

  console.log("Adding course!")
  return initialstate
  }

  const deleteCourse = (course) =>{
    const obj_lev = initialstate.children.find( ({ name }) => name === course.level);
    const obj_year = obj_lev.children.find(({name}) => name === course.year);
    const obj_period = obj_year.children.find(({name}) => name === course.period);

    for(var i = obj_period.children.length-1; i >= 0; i--){
      if(course.code === obj_period.children[i].name){
        obj_period.children.splice(i, 1)
      }
    }
    console.log("Deleting course!")
    return initialstate
  }
  
async function fetchAll(prog, year){
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const urlProg = 'http://api.kth.se/api/kopps/v2/programme/academic-year-plan/'+prog+'/'+year
 // const response = await fetch(proxy+urlProg);
 // const prog_json = await response.json();
 // const result = prog_json.Specs

  var x = fetch(proxy+urlProg)
    .then((response) => response.json())
    .then((responseJSON) => {
       // do stuff with responseJSON here...
       //console.log(responseJSON);
       return initialstate
    });

  
}

const addPeriods = (period, year, bach, course)=>{
  let p_str = 'P'+(period).toString()
  let y_str = 'Year '+year.toString()
  if(p_str in course.ConnectedRound){
    if(courseExist(course.Code, bach.children.find(({name}) => name === y_str).children[period-1].children) === false){
      bach.children.find(({name}) => name === y_str).children[period-1].children
      .push({name: course.Code, courseName:course.Name, size:course.ConnectedRound[p_str], fromBach_allInfo:course})
    }
    else{
      alert('course already exists')
    }
  }
}



const AddBachelor = (fetch, track) =>{
  const bachelor_courses = initialstate.children.find(({name}) => name === 'bachelor');
  fetch.map(element => {
    element.Electivity[0].Courses.map(course =>{
      if("ConnectedRound" in course){
      //  if(element.SpecCode === track || !("SpecCode" in element)){
          if(!("SpecCode" in element)){
          if(element.StudyYear === 1){
            for(var i = 1; i < 5; i++){
                addPeriods(i, element.StudyYear, bachelor_courses, course)
            }
          }
          if(element.StudyYear === 2){
            for(var i = 1; i < 5; i++){
                addPeriods(i, element.StudyYear, bachelor_courses, course)
            }
          }
          if(element.StudyYear === 3){
            for(var i = 1; i < 5; i++){
                addPeriods(i, element.StudyYear, bachelor_courses, course)
            }
          }
        }
      }
    })
  })
  console.log('add bachelor courses')
  return initialstate
}

const moveCourse = (course, moveTo)=>{
  var courseObject = {code:course.course_code, level: course.bach_mas, year: course.year, period: course.period}
  
  deleteCourse(courseObject)

  let level = '';
  if(moveTo.year == "Year 1" || moveTo.year == "Year 2" || moveTo.year == "Year 3"){
    level='bachelor'
  }
  else if(moveTo.year === "Year 4" || moveTo.year === "Year 5"){
    level ='master'
  }
 
  var courseObjMove = {}
  courseObjMove.name = course.course_code
  courseObjMove.courseName = course.title
  courseObjMove.size = course.size
  courseObjMove.allInfo = course

  const obj_lev = initialstate.children.find( ({ name }) => name === level);
  const obj_year = obj_lev.children.find(({name}) => name === moveTo.year);
  const obj_period = obj_year.children.find(({name}) => name === moveTo.period);

  obj_period.children.push(courseObjMove)

  console.log("Moving course!")
  return initialstate

}

export const initialstate = empty_dataset()

export const studyplanReducer = (state,action) =>{
    switch (action.type){
        case 'ADD_COURSE':
            addCourse(action.courseObject.course, action.courseObject.year, action.courseObject.period);
            const newState1 = {...state}
            return newState1;
      case 'DELETE_COURSE':
            deleteCourse(action.courseObject);
            const newState2 = {...state}
            return newState2;
      case 'ADD_BACHELOR':
           // AddBachelor(action.fetchedProg, action.track);
           AddBachelor(action.fetchedProg);
            const newState3 = {...state}
            return newState3;
      case 'MOVE_COURSE':
           moveCourse(action.course, action.moveTo);
            const newState4 = {...state}
            return newState4;
        default:
            return state;
        }
    };



    
