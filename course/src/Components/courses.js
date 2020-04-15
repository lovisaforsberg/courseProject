import React, {useState} from "react";
import { useFetchCourses } from "../Data/useFetchCourses";
import DisplayData from "./courses_data"
import {createCourseData} from "../Data/createDataset"

const proxy = 'https://cors-anywhere.herokuapp.com/'
const urlCourses = 'https://api.kth.se/api/kopps/v2/courses?l=en'
const urlDepartments = 'https://api.kth.se/api/kopps/v2/schools/departments?department_criteria=has_courses&listForActiveCourses=true&l=en'
const urlFallCourses = 'https://api.kth.se/api/kopps/v2/courses/offerings?from=20202&skip_coordinator_info=true&l=en'
const urlSpringCourses = 'https://api.kth.se/api/kopps/v2/courses/offerings?from=20211&skip_coordinator_info=true&l=en'

function Courses() {
const [schools, setSchools] = useState({})
const [courses, setCourses] = useState({})


//const [allCourses, loadingCourses] = useFetchCourses(proxy+urlCourses);
const [allDepartments, loadingDepartments] = useFetchCourses(proxy+urlDepartments);
const [allFallCourses, loadingFallCourses] = useFetchCourses(proxy+urlFallCourses);
const [allSpringCourses, loadingSpringCourses] = useFetchCourses(proxy+urlSpringCourses);

let props = {}

if(loadingFallCourses == false && loadingDepartments == false && loadingSpringCourses == false){
props = createCourseData(allDepartments, allFallCourses, allSpringCourses)
console.log(allFallCourses)
}

/*
let props = {
    schools:allSchools,
    courses:allCourses
    }
*/

  return (
    <>
      <h1>Courses</h1>
      {(loadingSpringCourses) ? ("Loading.."): <DisplayData {...props}></DisplayData>}
    </>
  );
}
export default Courses;