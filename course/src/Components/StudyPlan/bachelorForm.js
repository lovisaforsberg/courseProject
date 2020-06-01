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

export const PopupContextExplain = createContext({})

const questionIcon = require('./questionmark.png')

const BachelorForm = () =>{

const [prog,setProg] = useInput('');
const [year,setYear] = useInput('');
const [track,setTrack] = useInput('');
const [data,setData] = useState([])
const [allProgs, setAllProgs] = useState([])
const [clicked, setClicked] = usePersistedState(false,'clicked')
const [selectedProgram, setSelectedProgram] = useState({})
const [show, setShow] = useState(false)
const [isPopupShown, setPopupShown] = useState(false)
//const [progState, setProgState] = usePersistedState(prog,'prog')
//const [yearState, setYearState] = usePersistedState(year,'year')

const [state,dispatch] = useContext(StudyplanContext);
const [isLoading, setIsLoading] = useState(true)
//const [bachelorName, setBachelorName] = useState("")

const name_context = useContext(BachelorNameContext)
const {BachelorName, setBachelorName} = name_context
console.log(BachelorName)



const showPopup = () =>{
  setPopupShown(true);

}
function setUrl(course_code){
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const urlCourse = 'https://api.kth.se/api/kopps/v2/course/'+course_code+'/detailedinformation?l=en'
  const full_url = proxy+urlCourse
  return full_url
}

const removeBachelor = () =>{
  dispatch({type:'REMOVE_BACHELOR',selectedProgram})
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
     console.log(fetchedProg)
     setSelectedProgram(fetchedProg)
  });
    
  }

  function flattenAndFetch (fetchedProg){
    const allCourses = []
    const more_info = []
    console.log('in flatten function')
    fetchedProg.map(year =>{
      year.Electivity[0].Courses.map(course=>{
        if(!("SpecCode" in year)){
          allCourses.push(course)
        }
      })  
    })
    console.log(allCourses)
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


    dispatch({type: 'ADD_BACHELOR', fetchedProg, more_info})
    setSelectedProgram(fetchedProg)
    console.log(fetchedProg)
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
    
        getBachelorName(prog) //sets the title of the chosen program
        flattenAndFetch(fetchedProg)

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
  },[])


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
  console.log("remove")
  //dispatch({type: 'REMOVE_BACHELOR'})
  console.log(selectedProgram)
  removeBachelor()
  setClicked(false)
  e.preventDefault()
}

const handleSubmit = (e) =>{
    console.log("submit")
    addBachelor(prog, year)
    console.log(prog)
    console.log(year)
    setClicked(true)
    e.preventDefault()
}

const getBachelorName = (chosenProg) =>{
  allProgs.map(bachelor =>{
      if (chosenProg == bachelor.code){
        console.log(bachelor.title)
        setBachelorName(bachelor.title)
        
      }
  })
  localStorage.setItem("nameData", JSON.stringify(BachelorName))
  console.log(BachelorName) 
}

/*
useEffect(()=>{
  setProgState(prog)
  setYearState(year)
},[prog,year])*/

return(
    <React.Fragment>
    
        <form>
        {show?<ExplanationPopup/>:null}
        <div className="row bachelorHeadline">
          Add your bachelor courses to study plan
          <img src={questionIcon} className="questionIcon" onClick={showPopup} style={{cursor:'pointer'}}></img>
        </div>
        <div className="row">
        <select
          name = 'program'
          defaultValue={prog}
          onChange={e =>setProg(e)}
          className='program'
        >
            <option key='Program' disabled={true} value={prog}>
                Program
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
                Year
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
        You can add the courses in your masters program manually using the search function 
        </div>
        <div className="buttonContainer">

        <button className="addBachelorButton" onClick={handleSubmit}>ADD TO PLAN</button>
       {/* {clicked ? <button className="removeBachelorButton" onClick={handleRemove}>Remove all bachelor courses</button>:null} */}
       <button className="removeBachelorButton" onClick={handleRemove}>Remove all bachelor courses</button>
        </div>
        </form>  
        {isPopupShown && 
                <PopupContextExplain.Provider value={{ popup_context: {isPopupShown, setPopupShown}}}>
                  <ExplanationPopup/>
                </PopupContextExplain.Provider>

              }
        
     

  </React.Fragment>

)

}
export default BachelorForm;