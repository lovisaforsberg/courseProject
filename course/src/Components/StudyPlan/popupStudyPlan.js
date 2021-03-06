import React, {useContext, useState, useImperativeHandle, useReducer} from 'react';
import ReactDOM from 'react-dom';
import { PopupContextDelete } from './studyPlanDetails';
import StudyplanContext from "../../store"
import "./popupStudyPlan.css"
import {ZoomedInContext} from "./studyPlanContainer"
import {studyplanReducer,initialstate} from "../../reducers/studyplanReducer"

const PopupStudyPlan = ({sentCourse}) =>{

const {popup_context, detail_context} = useContext(PopupContextDelete)
const {popupShow, setPopupShown} = popup_context 
const {detailShow, setDetailShown} = detail_context

const [state,dispatch] = useContext(StudyplanContext);
const useStudyplanReducer = useReducer(studyplanReducer, initialstate)

	const zoom_context = useContext(ZoomedInContext)
	const {ZoomedData, setZoomedData} = zoom_context
	let zoomDataObj = ZoomedData

const [isAdded, setisAdded] = useState(false)


const closePopup = () =>{
    setPopupShown(false)
    setDetailShown(false)
}

const handleSubmit = (course)=>{
  setisAdded(true)
  setTimeout(closePopup, 1000)
  removeCourse(course)
  setZoomedData(initialstate)


}

const removeCourse = (course) =>{
    const courseObject = {code:course.course_code, level: course.bach_mas, year: course.year, period: course.period}
    dispatch({type: 'DELETE_COURSE', courseObject})
 
    }

if(isAdded === false){

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
    
        <div className="row headline">
        Do you want to remove {sentCourse.course_code} from your study plan?
        </div>
        <p className='descriptionText'>Remember: this will only remove {sentCourse.course_code} from {sentCourse.period}, {sentCourse.year} <br/>
        If the course spans over multiple periods, you need to remove them separatley</p>
        
        <button className="addButton" style={{backgroundColor:sentCourse.color}} onClick={()=>handleSubmit(sentCourse)}>YES</button>
        <button className="addButton" style={{backgroundColor:'grey'}} onClick={closePopup}>NO</button>

      </div>
    </div>
  </React.Fragment>, document.body
)
)
    }
else{
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
    
        <div className="row headline">
        {sentCourse.course_code} is removed
        </div>
       
      </div>
    </div>
  </React.Fragment>, document.body
)
)
}

}
export default PopupStudyPlan;