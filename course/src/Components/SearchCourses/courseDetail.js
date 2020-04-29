import React, { useContext, useEffect, useState } from 'react';
import './courseDetail.css'
import {useFetchCourses} from '../../Data/useFetchCourses'
import {DetailContext} from './courses_data'

const proxy = 'https://cors-anywhere.herokuapp.com/'

function setUrl(course_code){
    const urlCourse = 'https://api.kth.se/api/kopps/v2/course/'+course_code+'/detailedinformation?l=en'
    return urlCourse
}

function openTab(tabToOpen){
    var i;
    var x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(tabToOpen).style.display = "block";

    if(tabToOpen=='information_tab'){
        document.getElementById('tabLink_info').className = 'cardTabLink active_card'
        document.getElementById('tabLink_about').className = 'cardTabLink'
    }
    if(tabToOpen=='about_tab'){
        document.getElementById('tabLink_info').className = 'cardTabLink'
        document.getElementById('tabLink_about').className = 'cardTabLink active_card'
    }
  }



const CourseDetail=({sentCourse})=> {

    const detail_context = useContext(DetailContext)
    const {detailShow, setDetailShown} = detail_context

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

       // if(fetchedCourse.course.infoContactName !== undefined){
        if('recruitmentText' in fetchedCourse.course){
            courseInfo.about = fetchedCourse.course.recruitmentText
            .replace(/<p>/g, '').replace(/<\/p>/g, '')
            .replace(/<em>/g, '').replace(/<\/em>/g, '')
            .replace(/<ul>/g, '').replace(/<\/ul>/g, '')
            .replace(/<li>/g, '').replace(/<\/li>/g, ', ')
            .replace(/&#8217;/g, "'")
            
        }
        else{
            courseInfo.about = "description missing"
        }

        courseInfo.contactName = fetchedCourse.course.infoContactName
        //courseInfo.about = fetchedCourse.course.recruitmentText

        courseInfo.supplement_info = fetchedCourse.course.supplementaryInfo
        courseInfo.prerequisites = fetchedCourse.course.prerequisites
        
        courseInfo.level = sentCourse.education_level
        courseInfo.givenPeriods = sentCourse.period
        courseInfo.language = sentCourse.language
        courseInfo.color = sentCourse.color

        console.log(courseInfo)


        return(
            <>
            <div className="infoContainer">
                <header className="infoHeadline" style={{backgroundColor:courseInfo.color}}>
                    <div>
                        <h4 id="textHeadline">{courseInfo.title} ({courseInfo.course_code})</h4>
                        <h5 id="textHeadline"></h5>
                        <h6 id="textHeadline"><strong>Given by: </strong>{courseInfo.department.name}</h6> 

                    </div>
                    <div className='iconHeadline'>
                        <i onClick={()=>setDetailShown(false)} className="cross_icon fas fa-times"></i>
                    </div>
                </header>
                <div className="cardTabBar">
                    <button className="cardTabLink active_card" id="tabLink_info" onClick={()=>openTab('information_tab')}>Information</button>
                    <button className="cardTabLink" id="tabLink_about" onClick={()=>openTab('about_tab')}>About</button>
                </div>
                <div id='information_tab' className='tab'>
                    <div className="infoText">
                        <p className='infoTextLine'><strong>Credits: </strong>{courseInfo.size} hp</p>
                        <p className='infoTextLine'><strong>Educational Level: </strong>{courseInfo.level}</p>
                        <p className='infoTextLine'><strong>Subject(s): </strong>{courseInfo.subjects.map(sub=>{return sub+', '})}</p>

                        <p className='infoTextLine'><strong>Grading scale: </strong>{courseInfo.gradeScale}</p>
                        <p className='infoTextLine'><strong>Contact for information: </strong>{courseInfo.contactName}</p>
                    </div>
                </div>
                <div id='about_tab' className='tab' style={{display:'none'}}>
                    <div className="infoText">
                        <p><strong>About: </strong>{courseInfo.about}</p>
                    </div>
                </div>
                

                <footer className="infoFooter" >
                <div className='iconContainer'>
                   <i className="FooterIcon fas fa-cart-plus"></i>
                    <p className='FooterText'>Save for later</p> 
                </div>
                <div className='iconContainer'>
                    <i className="FooterIcon fas fa-graduation-cap"></i>
                    <p className='FooterText'>Add to study plan</p>
                </div>
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