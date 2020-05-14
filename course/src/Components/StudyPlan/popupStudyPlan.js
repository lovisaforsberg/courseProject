import React, {useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import { PopupContextDelete } from './studyPlanDetails';
import StudyplanContext from "../../store"
import "./popupStudyPlan.css"

const PopupStudyPlan = ({sentCourse}) =>{

const {popup_context, detail_context} = useContext(PopupContextDelete)
const {popupShow, setPopupShown} = popup_context 
const {detailShow, setDetailShown} = detail_context

const [state,dispatch] = useContext(StudyplanContext);


const closePopup = () =>{
    setPopupShown(false)
}

const removeCourse = (course) =>{
    const courseObject = {code:course.course_code, level: course.bach_mas, year: course.year, period: course.period}
    dispatch({type: 'DELETE_COURSE', courseObject})
    closePopup()
    setDetailShown(false)  
    }


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
        
        <button className="addButton" style={{backgroundColor:sentCourse.color}} onClick={()=>removeCourse(sentCourse)}>YES</button>
        <button className="addButton" style={{backgroundColor:'grey'}} onClick={closePopup}>NO</button>

      </div>
    </div>
  </React.Fragment>, document.body
)
)

}
export default PopupStudyPlan;