import React from "react";
import { useFetchCourses } from "../Data/useFetchCourses";

const proxy = 'https://cors-anywhere.herokuapp.com/'
const urlCourses = 'https://api.kth.se/api/kopps/v2/courses?l=en'
const urlSchools = 'https://api.kth.se/api/kopps/v2/schools'
const urlCourse = 'https://api.kth.se/api/kopps/v2/course/'


function Courses() {

const [allCourses, loadingCourses] = useFetchCourses(proxy+urlCourses);
const [allSchools, loadingSchools] = useFetchCourses(proxy+urlSchools);

  return (
    <>
      <h1>Courses</h1>
      {loadingSchools ? ("Loading Schools"): (console.log(allSchools))}
      {loadingCourses ? ("Loading Courses"): (console.log(allCourses))}
    </>
  );
}
export default Courses;