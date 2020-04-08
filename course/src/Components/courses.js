import React, {useState} from "react";
import { useFetchCourses } from "../Data/useFetchCourses";
import DisplayData from "./courses_data"
import {createCourseData} from "../Data/createDataset"

const proxy = 'https://cors-anywhere.herokuapp.com/'
const urlCourses = 'https://api.kth.se/api/kopps/v2/courses?l=en'
const urlDepartments = 'https://api.kth.se/api/kopps/v2/schools/departments?department_criteria=has_courses&listForActiveCourses=true&l=en'


function Courses() {
const [schools, setSchools] = useState({})
const [courses, setCourses] = useState({})


const [allCourses, loadingCourses] = useFetchCourses(proxy+urlCourses);
const [allDepartments, loadingDepartments] = useFetchCourses(proxy+urlDepartments);


let props = {}

if(loadingCourses == false && loadingDepartments == false){
props = createCourseData(allDepartments,allCourses)
}

/*
let props = {
    schools:allSchools,
    courses:allCourses
    }*/


  return (
    <>
      <h1>Courses</h1>
      {(loadingCourses) ? ("Loading.."): <DisplayData {...props}></DisplayData>}
    </>
  );
}
export default Courses;