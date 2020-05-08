//import {empty_dataset} from "../Data/dataSunburst"
import { useState, useEffect } from "react";
import {useFetchCourses} from '../Data/useFetchCourses'

const empty_dataset = ()=>{
    var dataset = {}
  
   let courses_per = { 
    year1P1: [{name:'123', courseName:'test', size:4}], year1P2: [], year1P3: [], year1P4: [],
    year2P1: [{name:'123', courseName:'test', size:4}], year2P2: [], year2P3: [], year2P4: [],
    year3P1: [], year3P2: [], year3P3: [{name:'5674', courseName:'test2', size:7}], year3P4: [],
    year4P1: [{name:'123', courseName:'test', size:4}], year4P2: [], year4P3: [], year4P4: [],
    year5P1: [{name:'123', courseName:'test', size:4}], year5P2: [], year5P3: [], year5P4: [],
  }
  
    var year1_periods = [{name: 'P1', children: courses_per.year1P1, color: '#DE96C5'}, {name: 'P2', children: courses_per.year1P2, color: '#DE96C5'}, {name: 'P3', children: courses_per.year1P3, color: '#DE96C5'}, {name: 'P4', children: courses_per.year1P4, color: '#DE96C5'}]
    var year2_periods = [{name: 'P1', children: courses_per.year2P1, color: '#D0746A'}, {name: 'P2', children: courses_per.year2P2, color: '#D0746A'}, {name: 'P3', children: courses_per.year2P3, color: '#D0746A'}, {name: 'P4', children: courses_per.year2P4, color: '#D0746A'}]
    var year3_periods = [{name: 'P1', children: courses_per.year3P1, color: '#EDDF6C'}, {name: 'P2', children: courses_per.year3P2, color: '#EDDF6C'}, {name: 'P3', children: courses_per.year3P3, color: '#EDDF6C'}, {name: 'P4', children: courses_per.year3P4, color: '#EDDF6C'}]
    var year4_periods = [{name: 'P1', children: courses_per.year4P1, color: '#83BB93'}, {name: 'P2', children: courses_per.year4P2, color: '#83BB93'}, {name: 'P3', children: courses_per.year4P3, color: '#83BB93'}, {name: 'P4', children: courses_per.year4P4, color: '#83BB93'}]
    var year5_periods = [{name: 'P1', children: courses_per.year5P1, color: '#77B5D5'}, {name: 'P2', children: courses_per.year5P2, color: '#77B5D5'}, {name: 'P3', children: courses_per.year5P3, color: '#77B5D5'}, {name: 'P4', children: courses_per.year5P4, color: '#77B5D5'}]
  
    var bachelor_years = [{name: 'year1', children: year1_periods, color:'#CC5BA4'}, {name: 'year2', children: year2_periods, color:'#C65649'}, {name: 'year3', children: year3_periods, color:'#EAD94C'}]
    var master_years = [{name: 'year4', children: year4_periods, color:'#68AD7C'}, {name: 'year5', children: year5_periods, color:'#59A5CC'}]
  
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
    console.log(course)
    console.log(year)
    console.log(period)
    let level = '';

    if(year == "year1" || year == "year2" || year == "year3"){
        level='bachelor'
    }
    else if(year === "year4" || year === "year5"){
        level ='master'
    }
  const courseObject = {}
  courseObject.name = course.course_code
  courseObject.courseName = course.title
  courseObject.size = course.size
  console.log(courseObject)

  const obj_lev = initialstate.children.find( ({ name }) => name === level);
  const obj_year = obj_lev.children.find(({name}) => name === year);
  const obj_period = obj_year.children.find(({name}) => name === period);
  console.log(obj_period)
  if(courseExist(course.course_code, obj_period.children) === false){
    obj_period.children.push(courseObject)
  }
  else{
    alert('course already exists')
  }

  console.log("Adding course!")
  return initialstate
  }

  const deleteCourse = (course) =>{
    console.log(course)
    const obj_lev = initialstate.children.find( ({ name }) => name === course.level);
    const obj_year = obj_lev.children.find(({name}) => name === course.year);
    const obj_period = obj_year.children.find(({name}) => name === course.period);

    for(var i = obj_period.children.length-1; i >= 0; i--){
      if(course.code === obj_period.children[i].name){
        obj_period.children.splice(i, 1)
      }
    }
    console.log(initialstate)
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
       console.log(responseJSON);
       return initialstate
    });

  
}

const addPeriods = (period, year, bach, course)=>{
  let p_str = 'P'+(period).toString()
  let y_str = 'year'+year.toString()
  if(p_str in course.ConnectedRound){
    if(courseExist(course.Code, bach.children.find(({name}) => name === y_str).children[period-1].children) === false){
      bach.children.find(({name}) => name === y_str).children[period-1].children
      .push({name: course.Code, courseName:course.Name, size:course.ConnectedRound[p_str]})
    }
    else{
      console.log('course already exists')
    }
  }
}



const AddBachelor = (fetch, track) =>{
  const bachelor_courses = initialstate.children.find(({name}) => name === 'bachelor');
  fetch.map(element => {
    element.Electivity[0].Courses.map(course =>{
      if("ConnectedRound" in course){
        if(element.SpecCode === track || !("SpecCode" in element)){
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
            AddBachelor(action.fetchedProg, action.track);
            const newState3 = {...state}
            return newState3;
        default:
            return state;
        }
    };



    