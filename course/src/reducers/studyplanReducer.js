//import {empty_dataset} from "../Data/dataSunburst"

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
  
const addCourse = () =>{
    console.log("Adding course!")
  }

  const deleteCourse = () =>{
    console.log("Deleting course!")
  }

export const initialstate = empty_dataset()

export const studyplanReducer = (state,action) =>{
    switch (action.type){
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



    
