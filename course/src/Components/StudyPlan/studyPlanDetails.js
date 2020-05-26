import React, { useContext, useEffect, useState, useRef, createContext } from 'react';
import './studyPlanDetails.css'
import {useFetchCourses} from '../../Data/useFetchCourses'
import {StudyplanDetailContext} from './sunburst'
import PopupStudyPlan from "./popupStudyPlan"
import StudyplanContext from "../../store"
import {useInput} from "../SearchCourses/useInput"


export const PopupContextDelete = createContext({})


function setUrl(course_code){
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const urlCourse = 'https://api.kth.se/api/kopps/v2/course/'+course_code+'/detailedinformation?l=en'
    const full_url = proxy+urlCourse
    return full_url
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
    }
    if(tabToOpen=='about_tab'){
        document.getElementById('tabLink_info').className = 'cardTabLink'
        document.getElementById('tabLink_about').className = 'cardTabLink active_card'
    }
  }

 



const StudyPlanDetails=({sentCourse})=> {
    
    console.log(sentCourse)

    const handleSubmit = (e) =>{
        if(period === '' || year === '' || (period ==='' && year==='')){
            alert('you need to choose both year and period')
        }
        else{
            changeCourse()
        }
        e.preventDefault()
    }

    const changeCourse = () =>{
        let course = courseInfo
        //const courseObject = {code: sentCourse.name, level: sentCourse.level, year: sentCourse.year, period: sentCourse.period}
        const moveTo = {year: year, period: period}
        dispatch({type: 'MOVE_COURSE', course, moveTo})
        setDetailShown(false)

    }

    const [state,dispatch] = useContext(StudyplanContext);
    
    const detail_context = useContext(StudyplanDetailContext)

    const {detailShow, setDetailShown} = detail_context
    const [isPopupShown, setPopupShown] = useState(false)

    const [isLoading, setLoading] = useState(true)
    const [courseInfo, setCourseInfo] = useState({})

    const showPopup = (courseInfo) =>{
        setPopupShown(true);

    }

    const [year,setYear] = useInput('');
    const [period,setPeriod] = useInput('');

    const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5',]
    const periods = ['P1', 'P2', 'P3', 'P4']


    useEffect(()=>{


    if('allInfo' in sentCourse){
        sentCourse.allInfo.color = sentCourse.color
        sentCourse.allInfo.period = sentCourse.period
        sentCourse.allInfo.year = sentCourse.year
        sentCourse.allInfo.bach_mas = sentCourse.level
        setCourseInfo(sentCourse.allInfo)
        setLoading(false)
    }
    else{
        const course_url = setUrl(sentCourse.name)
        var x = fetch(course_url)
        .then((response) => response.json())
        .then((responseJSON) => {
           // do stuff with responseJSON here...
           const fetchedCourse = responseJSON
           let info = {}
           info.title = fetchedCourse.course.title
           info.course_code = fetchedCourse.course.courseCode
           info.size = fetchedCourse.course.credits
           info.level = fetchedCourse.course.educationalLevelCode
           info.gradeScale = fetchedCourse.course.gradeScaleCode
           info.department = fetchedCourse.course.department
           info.subjects = fetchedCourse.mainSubjects
           info.examiners = fetchedCourse.examiners
           info.urlSocial = fetchedCourse.socialCoursePageUrl

           info.color = sentCourse.color
           info.period = sentCourse.period
           info.year = sentCourse.year
           info.bach_mas = sentCourse.level
            
           setCourseInfo(info)
           setLoading(false)
        });
    }
   


    }, [sentCourse])
        if(isLoading === false){
         return(
            <>
            <div className="infoContainer" style={{marginRight:'0px'}}>
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
                {/*
                <div className="cardTabBar">
                    <button className="cardTabLink active_card" id="tabLink_info" onClick={()=>openTab('information_tab')}>Information</button>
                    <button className="cardTabLink" id="tabLink_about" onClick={()=>openTab('about_tab')}>About</button>

                </div>
                */}
                <div id='information_tab' className='tab'>
                    <div className="infoText">
                        <p className='infoTextLine' style={{fontSize:'15px', marginBottom:'4px'}}><strong>Credits: </strong>{courseInfo.size} hp</p>
                        <p className='infoTextLine'><strong>Educational Level: </strong>{courseInfo.level}</p>

                        <br/>
                        <a className='infoTextLine' href={courseInfo.urlSocial} target="_blank">Link to KTH social</a>
                    <form className='infoForm'>
                    
                     <div className="row headline2">
                         Move course to other time:
                    </div>
                    <div className="row dropdown" style={{margin:'0px'}}>
                         <select
                            style={{margin:'5px'}}
                            name = 'year'
                            defaultValue={courseInfo.year}
                            onChange={e =>setYear(e)}
                            >
                            
                            <option key='School year' disabled={true} value={courseInfo.year}>
                                Year
                                </option>
                            <option key="1" value="Year 1">
                                Year 1
                            </option>
                            <option key="2" value="Year 2">
                                Year 2
                            </option>
                            <option key="3" value="Year 3">
                                Year 3
                            </option>
                            <option key="4" value="Year 4">
                                Year 4
                            </option>
                            <option key="5" value="Year 5">
                                Year 5
                            </option> 
                            
                            {/*
                            {years.map(y=>{
                                if(y === courseInfo.year){
                                    return( 
                                        <option key={y.substr(-1)} value={y} selected>{y}</option>
                                    )}
                                else{
                                    return(
                                        <option key={y.substr(-1)} value={y}>{y}</option>
                                    )
                                }
                            })}
                        */}

                        </select>
                        <select
                        style={{margin:'5px'}}
                        name = 'period'
                        defaultValue={courseInfo.period}
                        onChange={e =>setPeriod(e)}
                        >
                            <option key='period' disabled={true} value={courseInfo.period}>
                                Period
                            </option>
                            <option key="P1" value="P1">
                                P1
                            </option> 
                            <option key="P2" value="P2">
                                P2
                            </option> 
                            <option key="P3" value="P3">
                                P3
                            </option> 
                            <option key="P4" value="P4">
                                P4
                            </option> 

                        </select>
                    
                     <button className="moveButton" style={{backgroundColor:courseInfo.color}} onClick={handleSubmit}>MOVE</button>
                     </div>
                </form>

                    </div>
                </div>
                <div id='about_tab' className='tab' style={{display:'none'}}>
                <form>
                    <div className="row headline">
                        MOVE {courseInfo.course_code} 
                     </div>
                     <div className="row headline2">
                         When did you read/do you plan to read this course?
                    </div>
                    <div className="row dropdown">
                         <select
                            name = 'year'
                            defaultValue={courseInfo.year}
                            onChange={e =>setYear(e)}
                            >
                            <option key='School year' disabled={true} value={courseInfo.year}>
                                Select year
                                </option>
                            <option key="1" value="Year 1">
                                Year 1
                            </option>
                            <option key="2" value="Year 2">
                                Year 2
                            </option>
                            <option key="3" value="Year 3">
                                Year 3
                            </option>
                            <option key="4" value="Year 4">
                                Year 4
                            </option>
                            <option key="5" value="Year 5">
                                Year 5
                            </option> 

                        </select>
                        <select
                        name = 'period'
                        defaultValue={courseInfo.period}
                        onChange={e =>setPeriod(e)}
                        >
                            <option key='period' disabled={true} value={courseInfo.period}>
                                Select Period
                            </option>
                            <option key="P1" value="P1">
                                P1
                            </option> 
                            <option key="P2" value="P2">
                                P2
                            </option> 
                            <option key="P3" value="P3">
                                P3
                            </option> 
                            <option key="P4" value="P4">
                                P4
                            </option> 

                        </select>
                     </div>
                     <button className="addButton" style={{backgroundColor:courseInfo.color}} onClick={handleSubmit}>ADD TO PLAN</button>
                </form>
            </div>

                

                <footer className="infoFooter" >
                <div className='iconContainer'>
                    <i onClick={showPopup} className="FooterIcon fas fa-trash"></i>
                    {/*<i onClick={()=>removeCourse(courseInfo)} className="FooterIcon fas fa-trash"></i>*/}
                    <p className='FooterText'>Remove from study plan</p>
                </div>
                </footer>

            </div>
            {console.log(isPopupShown)}
                {isPopupShown && 
                <PopupContextDelete.Provider value={{ popup_context: {isPopupShown, setPopupShown}, detail_context: {detailShow, setDetailShown} }}>
                  <PopupStudyPlan sentCourse={courseInfo}/>
                </PopupContextDelete.Provider>

              }

            </>
        );}
    else{
        return(
            <>
            <h1>course detail loading</h1>
            </>
        )
    }
         
   
         
}

export default StudyPlanDetails;