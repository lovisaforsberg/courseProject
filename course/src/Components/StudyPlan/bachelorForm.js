import React, {useContext, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useInput} from "../SearchCourses/useInput"
import StudyplanContext from "../../store"
import "./bachelorForm.css"

const BachelorForm = () =>{

const [prog,setProg] = useInput('');
const [year,setYear] = useInput('');
const [track,setTrack] = useInput('');
const [data,setData] = useState([])
const [allProgs, setAllProgs] = useState([])

const [state,dispatch] = useContext(StudyplanContext);

const addBachelor = (prog, year) =>{
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const urlProg = 'http://api.kth.se/api/kopps/v2/programme/academic-year-plan/'+prog+'/'+year
    //const [fetchedProg, loadningFetch] = useFetchCourses(proxy+urlProg)
    
  var x = fetch(proxy+urlProg)
  .then((response) => response.json())
  .then((responseJSON) => {
     // do stuff with responseJSON here...
     const fetchedProg = responseJSON.Specs
     dispatch({type: 'ADD_BACHELOR', fetchedProg})
  });
    
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


const handleSubmit = (e) =>{
    console.log("submit")
    addBachelor(prog, year)
    e.preventDefault()
}


return(
    <React.Fragment>
    
        <form>
        <div className="row headline">
        ADD BACHELOR
        </div>
        <div className="row dropdown">
        <select
          name = 'programme'
          defaultValue={prog}
          onChange={e =>setProg(e)}
        >
            <option key='Programme' disabled={true} value={prog}>
                Programme
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
                HT16
            </option>
                

        </select>
       
        </div>
        <button className="addButton" onClick={handleSubmit}>ADD TO PLAN</button>
        </form>
     

  </React.Fragment>

)

}
export default BachelorForm;