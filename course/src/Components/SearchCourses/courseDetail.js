import React, { useContext, useEffect, useState, useRef, createContext } from 'react';
import './courseDetail.css'
import {useFetchCourses} from '../../Data/useFetchCourses'
import {DetailContext} from './courses_data'
import Popup from "./popup"
import StudyplanContext from "../../store"
import {setSendData} from '../../Data/setSendData'
import { Default } from 'react-spinners-css';


export const PopupContext = createContext({})

const proxy = 'https://cors-anywhere.herokuapp.com/'

function setUrl(course_code){
    const urlCourse = 'https://api.kth.se/api/kopps/v2/course/'+course_code+'/detailedinformation?l=en'
    return urlCourse
}

function getHighestKey(object){
    var max = 0;
    for (var key in object) {
        max = (max < parseFloat(key)) ? parseFloat(key) : max;
    }
    return max.toString()
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
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
        document.getElementById('tabLink_exam').className = 'cardTabLink'
    }
    if(tabToOpen=='about_tab'){
        document.getElementById('tabLink_info').className = 'cardTabLink'
        document.getElementById('tabLink_about').className = 'cardTabLink active_card'
        document.getElementById('tabLink_exam').className = 'cardTabLink'
    }
    if(tabToOpen=='exam_tab'){
        document.getElementById('tabLink_info').className = 'cardTabLink'
        document.getElementById('tabLink_about').className = 'cardTabLink'
        document.getElementById('tabLink_exam').className = 'cardTabLink active_card'
    }
  }



const CourseDetail=({sentCourse})=> {

    const clickedCourse = (course) =>{
        dispatch({type: 'ADD_COURSE', course})
        
      }
    const [state,dispatch] = useContext(StudyplanContext);
    const detail_context = useContext(DetailContext)

    const {detailShow, setDetailShown} = detail_context
    const [isPopupShown, setPopupShown] = useState(false)

    const showPopup = (courseInfo) =>{
        setPopupShown(true);

    }

    const [fetchedCourse, loadningFetch] = useFetchCourses(proxy+setUrl(sentCourse.name))
    if(loadningFetch === false){  
        let courseInfo = setSendData(fetchedCourse, sentCourse)
        /*
        let courseInfo = {}
        courseInfo.title = fetchedCourse.course.title
        courseInfo.course_code = fetchedCourse.course.courseCode
        courseInfo.size = fetchedCourse.course.credits
        courseInfo.gradeScale = fetchedCourse.course.gradeScaleCode
        courseInfo.department = fetchedCourse.course.department
        courseInfo.subjects = fetchedCourse.mainSubjects
        courseInfo.examiners = fetchedCourse.examiners
        courseInfo.urlSocial = fetchedCourse.socialCoursePageUrl

       // if(fetchedCourse.course.infoContactName !== undefined){
        if('recruitmentText' in fetchedCourse.course){
            courseInfo.about = fetchedCourse.course.recruitmentText
            .replace(/<p>/g, '').replace(/<\/p>/g, '')
            .replace(/<em>/g, '').replace(/<\/em>/g, '')
            .replace(/<ul>/g, '').replace(/<\/ul>/g, '')
            .replace(/<li>/g, '').replace(/<\/li>/g, ', ')
            .replace(/<br \/>/g, ', ')
            .replace(/&#8217;/g, "'")    
        }
        else{
            courseInfo.about = "description missing"
        }

        if('prerequisites' in fetchedCourse.course){
            courseInfo.prerequisites = fetchedCourse.course.prerequisites
            .replace(/<p>/g, '').replace(/<\/p>/g, '')
            .replace(/<em>/g, '').replace(/<\/em>/g, '')
            .replace(/<ul>/g, '').replace(/<\/ul>/g, '')
            .replace(/<li>/g, '').replace(/<\/li>/g, ', ')
            .replace(/<br \/>/g, ', ')
            .replace(/&#8217;/g, "'")    
        }
        else{
            courseInfo.prerequisites = "prerequisites missing"
        }

        courseInfo.contactName = fetchedCourse.course.infoContactName
        courseInfo.supplement_info = fetchedCourse.course.supplementaryInfo

        var highestKey = (getHighestKey(fetchedCourse.examinationSets))
        courseInfo.examinationForm = fetchedCourse.examinationSets[highestKey].examinationRounds
        
        if('education_level' in sentCourse){
            courseInfo.level = sentCourse.education_level}
        else{courseInfo.level = '-'}
        if('period' in sentCourse){
            courseInfo.givenPeriods = sentCourse.period.filter(onlyUnique); }
        else{courseInfo.givenPeriods = []}
        courseInfo.language = sentCourse.language
        courseInfo.campus = sentCourse.campus
        courseInfo.color = sentCourse.color
        
        // FIND PERIOD INFO
        let periodInfo = []
        let allRounds = []
        console.log(fetchedCourse)
        fetchedCourse.roundInfos.map(Round =>{
            if (Round.round.campus.name === sentCourse.campus){
                allRounds.push(Round) 
            }
        })
        allRounds.filter(function(item){
        var i = periodInfo.findIndex(x => (x.round.courseRoundTerms[0].formattedPeriodsAndCredits == item.round.courseRoundTerms[0].formattedPeriodsAndCredits));
        if(i <= -1){periodInfo.push(item);}
        return null;
        });
        console.log(periodInfo)

        // ADD PERIOD INFO TO COURSEINFO
        let rounds = []
        periodInfo.map(round=>{
            let courseRound ={amountLecture: round.lectureCount,
            amountExercise: round.excerciseCount,
            roundResp: round.ldapResponsibles,
            roundTeachers: round.ldapTeachers,
            tutoringTime: round.round.tutoringTimeOfDay,
            periodsDivision: round.round.courseRoundTerms[0].formattedPeriodsAndCredits,
            courseRoundTerms: round.round.courseRoundTerms[0]}
            rounds.push(courseRound)
        })
        courseInfo.periodInfo = rounds

        console.log(courseInfo)
        */

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
                    <button className="cardTabLink" id="tabLink_exam" onClick={()=>openTab('exam_tab')}>Examination</button>

                </div>
                <div id='information_tab' className='tab'>
                    <div className="infoText overflowText">
                        <p className='infoTextLine' style={{fontSize:'15px', marginBottom:'4px'}}><strong>Credits: </strong>{courseInfo.size} hp</p>
                        <p className='infoTextLine'><strong>Educational Level: </strong>{courseInfo.level.charAt(0)+courseInfo.level.slice(1).toLowerCase()}</p>
                        <p className='infoTextLine'><strong>Language: </strong>{courseInfo.language}</p>
                        <p className='infoTextLine'><strong>Subject(s): </strong>{courseInfo.subjects.map(sub=>{return sub+', '})}</p>
                        <p className='infoTextLine'><strong>The course is given at: </strong>{courseInfo.campus}</p>
                        {/*<p className='infoTextLine'><strong>Given in period(s): </strong>{courseInfo.givenPeriods.map(per=>{return per+', '})}</p>*/}
                       
                        <p className='infoTextLine'><strong>Given in period(s): </strong>
                        {courseInfo.periodInfo.map(per=>{
                            if( (per.periodsDivision).length > 15){ //given in multiple periods
                                return <><div><li>{per.periodsDivision.replace(',', ' +')}</li></div>
                                <p className='infoTextLine italicText'>Note that this course round spans between multiple periods</p></>

                            //return <div><li>{per.periodsDivision_array[0]+ ' '+ per.periodsDivision_array[1]}</li></div>
                            }
                            else{
                                return <div><li>{per.periodsDivision.substring(0,2)}</li></div>
                            }

                            })}</p>
                        
                     

                       
                        <br/>
                        <p className='infoTextLine'><strong>Prerequisites: </strong>{courseInfo.prerequisites}</p>
                        <p className='infoTextLine'><strong>Contact for information: </strong>{courseInfo.contactName}</p>
                        <a className='infoTextLine' href={courseInfo.urlSocial} target="_blank">Link to KTH social</a>


                    </div>
                </div>
                <div id='about_tab' className='tab' style={{display:'none'}}>
                    <div className="infoText">
                        <p className= 'aboutText'><strong>About: </strong>{courseInfo.about}</p>
                    </div>
                </div>
                <div id='exam_tab' className='tab' style={{display:'none'}}>
                    <div className="infoText">
                        <p className='infoTextLine' style={{fontSize:'15px', marginBottom:'4px'}}><strong>Examination:</strong></p>
                        <span className='infoTextLine'>{courseInfo.examinationForm.map(moment =>{
                            return <div><li><strong>{moment.examCode}</strong>{': '+moment.title+', '+moment.credits+' hp'}</li>
                            <p style={{fontWeight:'300', marginLeft:15}} className='infoTextLine'>{'Grading scale: '+moment.gradeScaleCode}</p>
                            </div>
                        })}
                        </span>
                        <p className='infoTextLine'><strong>Examiner: </strong>{courseInfo.examiners.map(person=>{return <li>{ person.givenName+' '+person.lastName+', '+person.email }</li>})}</p>
                        <p className='infoTextLine'><strong>Grading scale for whole course: </strong>{courseInfo.gradeScale}</p>

                    </div>
                </div>
                

                <footer className="infoFooter" onClick={showPopup} >
               {/* <div className='iconContainer'>
          
                    <i className="FooterIcon far fa-heart"></i>
               
                    <i class="FooterIcon fas fa-heart"></i>
                    <p className='FooterText'>Save for later</p> 
                </div>*/}
                <div className='iconContainer'>
                    <div className="studyplanIcon"></div>
                    {/*<i onClick={showPopup} className="FooterIcon fas fa-graduation-cap"></i>*/}
                   <p className='FooterText'>Add to study plan</p>
                </div>
                </footer>

            </div>
                {isPopupShown && 
                <PopupContext.Provider value={{isPopupShown, setPopupShown}}>
                  <Popup sentCourse={courseInfo}/>
                </PopupContext.Provider>

              }
            </>
        );
        
    }
    //<PopupContext.Provider value={{isPopupShown, setPopupShown}}>
    //</PopupContext.Provider> 
    //clickedCourse(courseInfo)
    else{
        return(
            <>
            <div className='loadingSpinner'>
                <Default color='#404040' />  
            </div>
            
            </>
        )
    }

    
}

export default CourseDetail;