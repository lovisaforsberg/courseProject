import React, {useContext, useState, useEffect, createContext} from 'react';
import ReactDOM from 'react-dom';
import {useInput} from "../SearchCourses/useInput"
import StudyplanContext from "../../store"
import "./bachelorForm.css"
import usePersistedState from '../../Data/usePersistedState';
import ExplanationPopup from './explanationPopup'
import {useFetchCourses} from '../../Data/useFetchCourses'
import {setSendDataToStudyPlan} from '../../Data/setSendData'
import {BachelorNameContext} from './studyPlanContainer'
import explanationTexts from "./../../Data/explanationTexts.json"
import { PopupContextExplainBachelor } from './../../App'
import {ZoomedInContext} from "../StudyPlan/studyPlanContainer"
import PopupAdded from "./popupAdded"

export const PopupContextAdded = createContext({})
//export const PopupContextExplain = createContext({})

const questionIcon = require('./questionmark.png')

const BachelorForm = () =>{

  const contextValue = useContext(StudyplanContext);
  const data_to_map = contextValue[0]

const [prog,setProg] = useInput('');
const [year,setYear] = useInput('');
const [track,setTrack] = useInput('');
const [data,setData] = useState([])
const [allProgs, setAllProgs] = useState([])
const [clicked, setClicked] = usePersistedState(false,'clicked')
const [selectedProgram, setSelectedProgram] = useState({})
const [show, setShow] = useState(false)
//const [isPopupShown, setPopupShown] = useState(false)
//const [progState, setProgState] = usePersistedState(prog,'prog')
//const [yearState, setYearState] = usePersistedState(year,'year')

const [state,dispatch] = useContext(StudyplanContext);
const [isLoading, setIsLoading] = useState(true)
const [bachelorName, setBachelorName] = useState("")
const [isEmpty, setIsEmpty] = useState(true)
const [isAdded, setIsAdded] = useState(false)

/*const name_context = useContext(BachelorNameContext)
const {BachelorName, setBachelorName} = name_context
console.log(BachelorName)*/

const {popup_context_bachelor} = useContext(PopupContextExplainBachelor)

const {isPopupShownBachelor, setPopupShownBachelor} = popup_context_bachelor

const showPopup = () =>{
  setPopupShownBachelor(true);
}

function setUrl(course_code){
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const urlCourse = 'https://api.kth.se/api/kopps/v2/course/'+course_code+'/detailedinformation?l=en'
  const full_url = proxy+urlCourse
  return full_url
}

const removeBachelor = (prog) =>{
  let bach_name = getBachelorName(prog)
  dispatch({type:'REMOVE_BACHELOR',selectedProgram, bach_name})
}

const addBachelorORG = (prog, year) =>{
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const urlProg = 'http://api.kth.se/api/kopps/v2/programme/academic-year-plan/'+prog+'/'+year
    //const [fetchedProg, loadningFetch] = useFetchCourses(proxy+urlProg)
    
  var x = fetch(proxy+urlProg)
  .then((response) => response.json())
  .then((responseJSON) => {
     // do stuff with responseJSON here...
     const fetchedProg = responseJSON.Specs
     dispatch({type: 'ADD_BACHELOR', fetchedProg})
     setSelectedProgram(fetchedProg)
  });
    
  }

  function flattenAndFetch (fetchedProg, prog){
    const allCourses = []
    const more_info = []
    fetchedProg.map(year =>{
      year.Electivity[0].Courses.map(course=>{
        if(!("SpecCode" in year)){
          allCourses.push(course)
        }
      })  
    })
    const promises = allCourses.map(item =>{
      return fetch(setUrl(item.Code))
      .then(response=> {
      return response.json()
    })  
  })

  Promise.all(promises).then(results => {
    results.map(course =>{
      let sendData = setSendDataToStudyPlan(course)
      more_info.push(sendData)
    })
    closePopup()

    let bach_name = getBachelorName(prog)
    let start_year = year
    dispatch({type: 'ADD_BACHELOR', fetchedProg, more_info, bach_name, start_year})
    setSelectedProgram(fetchedProg)

 })


}

  const addBachelor = (prog, year) =>{
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const urlProg = 'http://api.kth.se/api/kopps/v2/programme/academic-year-plan/'+prog+'/'+year
    //const [fetchedProg, loadningFetch] = useFetchCourses(proxy+urlProg)

    var x = fetch(proxy+urlProg)
    .then((response) => response.json())
    .then((responseJSON) => {
        // do stuff with responseJSON here...
        var fetchedProg = responseJSON.Specs
        //console.log(flatten(fetchedProg))
    
         //sets the title of the chosen program
        flattenAndFetch(fetchedProg, prog)
       // closePopup()

  })

  }

  async function fetchUrl() {
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const urlProg = 'https://api.kth.se/api/kopps/v2/programme/'
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Access-Control-Allow-Origin': '*'}
    };
    const response = await fetch(proxy+urlProg, requestOptions);
    const json = await response.json();
    setData(json);
    const all_progs = []
    json.programmes.map(prog=>{
      if(prog.credits == '300.0' && prog.cancelled == "false"){
        if(prog.code == "COPEN"){
          let name = prog.title.en.slice(17)
          all_progs.push({title:name,code:prog.code})
        }
        else{
          let name=prog.title.en.slice(20)
          all_progs.push({title:name,code:prog.code})

        }
      }
    })

  setAllProgs(all_progs)
  }

  useEffect (() =>{
    fetchUrl()
    isBachelorEmpty(data_to_map)
   // localStorage.setItem("nameData", JSON.stringify(BachelorName))
  },[data_to_map])


/*
const sorted_periods = sentCourse.givenPeriods.sort(function (a, b) {
    if (a > b) {
        return 1;
    }
    if (b > a) {
        return -1;
    }
    return 0;
});*/

const handleRemove = (e) =>{
  //dispatch({type: 'REMOVE_BACHELOR'})
  removeBachelor(prog)
  setClicked(false)
  e.preventDefault()
}
const closePopup = () =>{
  setIsAdded(false)
}
const handleSubmit = (e) =>{
    if(prog === '' || year === '' || (prog ==='' && year==='')){
      alert('You need to select both Program and Year')
  }
  else{
      addBachelor(prog, year)
      setIsAdded(true)
      getBachelorName(prog)
     // setTimeout(closePopup, 10000)
      setClicked(true)
      //closePopup()
  }
    e.preventDefault()
}

const getBachelorName = (chosenProg) =>{
  let bachelor_name = ""
  allProgs.map(bachelor =>{
      if (chosenProg == bachelor.code){
        setBachelorName(bachelor.title)
        bachelor_name = bachelor.title
       // localStorage.setItem("nameData", JSON.stringify(bachelor.title))
      }
  })
  setBachelorName(bachelor_name)
  return bachelor_name
}


const isBachelorEmpty = (data) =>{
  const course_array = []
  data.children[0].children.map(year =>{
          year.children.map(period =>{
              period.children.map(course=>{
                  course_array.push(course)
              })
          })
      }) 
  if(course_array.length == 0){
      setIsEmpty(true)
  }
  else{
      setIsEmpty(false)
  }
}

 



return(

    <React.Fragment>
    
        <form>
        {isPopupShownBachelor?<ExplanationPopup props={explanationTexts.popups.bachelor_form}/>:null}
        <div className="row bachelorHeadline">
          Add your bachelor courses to study plan
          {/*<img src={questionIcon} className="questionIcon" onClick={showPopup} style={{cursor:'pointer'}}></img>*/}
          <i onClick={showPopup} style={{cursor:'pointer'}} className="far fa-question-circle infoButton_icon"></i>

        </div>
        <div className="row">
        <select
          name = 'program'
          defaultValue={prog}
          onChange={e =>setProg(e)}
          className='program'
        >
            <option key='Program' disabled={true} value={prog}>
                {isEmpty ? 'Program' :data_to_map.children[0].bachelor_name}
           
            </option>

            {allProgs.map(bachelor =>{
                return(
            <option key={bachelor.code} value={bachelor.code}>
                {bachelor.title}
                </option>)})
                }

        </select>
        <select
          name = 'year'
          defaultValue={year}
          onChange={e =>setYear(e)}
          className='year'
        >
            <option key='year' disabled={true} value={year}>
            {isEmpty ? 'Year' :data_to_map.children[0].start_year}
            </option>
            <option key='HT16' value='HT16'>
                HT16
            </option>
            <option key='HT17' value='HT17'>
                HT17
            </option>
            <option key='HT18' value='HT18'>
                HT18
            </option>
            <option key='HT19' value='HT19'>
                HT19
            </option>
                

        </select>
       
        </div>
        <div id="masterText">
        If you wish to change bachelor program, remember to remove all bachelor courses, using the remove button below, before selecting the new bachelor.
        </div>
        <div className="buttonContainer">

        <button className="addBachelorButton" onClick={handleSubmit}>Add to plan</button>
       {/* {clicked ? <button className="removeBachelorButton" onClick={handleRemove}>Remove all bachelor courses</button>:null} */}
       <button className="removeBachelorButton" onClick={handleRemove}>Remove all bachelor courses</button>
        </div>
        </form>  
        {isPopupShownBachelor && 
                  <ExplanationPopup props={explanationTexts.popups.bachelor_form}/>

              }
        {isAdded && 
           <PopupContextAdded.Provider value={{isAdded,setIsAdded}}>
           <PopupAdded bachelor={bachelorName} year={year}/>
         </PopupContextAdded.Provider>
        }
        
     

  </React.Fragment>

)

}
export default BachelorForm;