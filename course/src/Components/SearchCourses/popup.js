import React, {useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import { PopupContext } from './courseDetail';
import {useInput} from "./useInput"
import StudyplanContext from "../../store"
import "./popup.css"

const Popup = ({sentCourse}) =>{

const [year,setYear] = useInput('');
const [period,setPeriod] = useInput('');
const [level, setLevel] = useState('');
console.log(sentCourse)

sentCourse.givenPeriods.map(period =>{
    console.log(period)
})
const sorted_periods = sentCourse.givenPeriods.sort(function (a, b) {
    if (a > b) {
        return 1;
    }
    if (b > a) {
        return -1;
    }
    return 0;
});

const popup_context = useContext(PopupContext)
const {popupShow, setPopupShown} = popup_context 
const [state,dispatch] = useContext(StudyplanContext);


const closePopup = () =>{
    setPopupShown(false)
}

const handleSubmit = (e) =>{
    console.log("submit")
    sunburstAction()
    closePopup()
    e.preventDefault()
}

const sunburstAction = () =>{
    const courseObject = {course: sentCourse, year: year, period: period}
    console.log(courseObject)
    dispatch({type: 'ADD_COURSE', courseObject})
}




console.log(year)
console.log(period)


return(
    ReactDOM.createPortal(
    <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={closePopup}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
    
        <form>
        <div className="row headline">
    ADD {sentCourse.course_code} TO STUDY PLAN
        </div>
        <div className="row headline2">
            When did you read/do you plan to read this course?
        </div>
        <div className="row dropdown">
        <select
          name = 'year'
          defaultValue={year}
          onChange={e =>setYear(e)}
        >
            <option key='School year' disabled={true} value={year}>
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

        </select>
        <select
          name = 'period'
          defaultValue={period}
          onChange={e =>setPeriod(e)}
        >
            <option key='School year' disabled={true} value={period}>
                Period
            </option>
            {
            sorted_periods.map(period =>{
                return(
            <option key={period} value={period}>
                {period}
            </option>)
            })
            }
        </select>
        </div>
        <button className="addButton" style={{backgroundColor:sentCourse.color}}onClick={handleSubmit}>ADD TO PLAN</button>
        </form>
     
      </div>
    </div>
  </React.Fragment>, document.body
)
)

}
export default Popup;