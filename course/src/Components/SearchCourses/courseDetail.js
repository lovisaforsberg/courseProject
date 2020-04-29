import React, { useContext, useEffect, useState } from 'react';
import './courseDetail.css'
import {useFetchCourses} from '../../Data/useFetchCourses'

const proxy = 'https://cors-anywhere.herokuapp.com/'


function setUrl(course_code){
    const urlCourse = 'https://api.kth.se/api/kopps/v2/course/'+course_code+'/detailedinformation?l=en'
    return urlCourse
}
/*
function useFetchCourses(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    async function fetchUrl() {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setLoading(false);
    }
    useEffect(() => {
      fetchUrl();
    }, [url]);
    return [data, loading];
  }
  */

const CourseDetail=({sentCourse})=> {
    //const [courseShown, setCourseShown] = useState({})
    const [fetchedCourse, loadningFetch] = useFetchCourses(proxy+setUrl(sentCourse.name))
    if(loadningFetch === false){  
        let courseInfo = {}
        courseInfo.title = fetchedCourse.course.title
        courseInfo.course_code = fetchedCourse.course.courseCode
        courseInfo.size = fetchedCourse.course.credits
        courseInfo.gradeScale = fetchedCourse.course.gradeScaleCode
        courseInfo.department = fetchedCourse.course.department
        courseInfo.subjects = fetchedCourse.mainSubjects
        courseInfo.examiners = fetchedCourse.examiners

        courseInfo.contactName = fetchedCourse.course.infoContactName
        //courseInfo.about = fetchedCourse.course.recruitmentText.replace('<p>', '').replace('</p>', '')
        courseInfo.about = fetchedCourse.course.recruitmentText

        courseInfo.supplement_info = fetchedCourse.course.supplementaryInfo
        courseInfo.prerequisites = fetchedCourse.course.prerequisites
        
        courseInfo.level = sentCourse.education_level
        courseInfo.givenPeriods = sentCourse.period
        courseInfo.language = sentCourse.language
        courseInfo.color = sentCourse.color

        console.log(courseInfo)


        return(
            <>
            <h1>course detail</h1>
            <p>{courseInfo.title}</p>
            <div className="infoCard">

            <header className="infoHeadline" style={{backgroundColor:courseInfo.color}}>
            <h1 id="textHeadline">{courseInfo.title}</h1>
            <h2 id="textHeadline">{courseInfo.course_code}</h2>
            <h2 id="textHeadline">close</h2>

            </header>

            <div className="infoText">
                <p><strong>Credits: </strong>{courseInfo.size} hp</p>
                <p><strong>Grading scale: </strong>{courseInfo.gradeScale}</p>
                <p><strong>Contact for information: </strong>{courseInfo.contactName}</p>

                <p>{courseInfo.about}</p>
            </div>

            <footer className="infoFooter">
            <h5>Footer</h5>
            </footer>

            </div>
            </>
        );
        
    }
    else{
        return(
            <>
            <h1>course detail loading</h1>
            </>
        )
    }

    
}

export default CourseDetail;