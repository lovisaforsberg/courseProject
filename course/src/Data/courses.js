import React, {useState, createContext} from "react";
import { useFetchCourses } from "./useFetchCourses";
import DisplayData from "../Components/SearchCourses/courses_data"
import {createCourseData} from "./createDataset"
import CoursesContainer from "../Components/SearchCourses/coursesContainer"
import NavBar from "../Components/Navbar"

const proxy = 'https://cors-anywhere.herokuapp.com/'
const urlCourses = 'https://api.kth.se/api/kopps/v2/courses?l=en'
const urlDepartments = 'https://api.kth.se/api/kopps/v2/schools/departments?department_criteria=has_courses&listForActiveCourses=true&l=en'
const urlFallCourses = 'https://api.kth.se/api/kopps/v2/courses/offerings?from=20202&skip_coordinator_info=true&l=en'
const urlSpringCourses = 'https://api.kth.se/api/kopps/v2/courses/offerings?from=20211&skip_coordinator_info=true&l=en'

export const DataContext = createContext({})

function Courses() {
const [schools, setSchools] = useState({})
const [courses, setCourses] = useState({})


//const [allCourses, loadingCourses] = useFetchCourses(proxy+urlCourses);
const [allDepartments, loadingDepartments] = useFetchCourses(proxy+urlDepartments);
const [allFallCourses, loadingFallCourses] = useFetchCourses(proxy+urlFallCourses);
const [allSpringCourses, loadingSpringCourses] = useFetchCourses(proxy+urlSpringCourses);

let props = {}
let filteredprops = {}

if(loadingFallCourses === false && loadingSpringCourses === false){
  props = createCourseData(allDepartments, allFallCourses, allSpringCourses)
  console.log(props)

 //const initialData = {data:props}
  

/*
  return (
    <>
    <h1>Courses</h1>
    <CoursesContainer data={props}></CoursesContainer>
    </>
  )*/
  return (
    <DataContext.Provider value={props}>
      <CoursesContainer>
        
      </CoursesContainer>
    </DataContext.Provider>
  );

}
else{
  return (
    <>
    </>
  )
}



/*
let props = {
    schools:allSchools,
    courses:allCourses
    }



  return (
    <>
      <h1>Courses</h1>
      {(loadingFallCourses && loadingSpringCourses) ? ("Loading.."): <CoursesContainer data={props}></CoursesContainer>}
    </>
  );*/
}

export default Courses;