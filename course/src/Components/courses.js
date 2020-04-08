import React, {useState} from "react";
import { useFetchCourses } from "../Data/useFetchCourses";
import DisplayData from "./courses_data"

const proxy = 'https://cors-anywhere.herokuapp.com/'
const urlCourses = 'https://api.kth.se/api/kopps/v2/courses?l=en'
const urlSchools = 'https://api.kth.se/api/kopps/v2/schools'
const urlCourse = 'https://api.kth.se/api/kopps/v2/course/'


function Courses() {
const [schools, setSchools] = useState({})
const [courses, setCourses] = useState({})


const [allCourses, loadingCourses] = useFetchCourses(proxy+urlCourses);
const [allSchools, loadingSchools] = useFetchCourses(proxy+urlSchools);

let props = {
    schools:allSchools,
    courses:allCourses
    }


  return (
    <>
      <h1>Courses</h1>
      {(loadingCourses) ? ("Loading.."): <DisplayData {...props}></DisplayData>}
    </>
  );
}
export default Courses;