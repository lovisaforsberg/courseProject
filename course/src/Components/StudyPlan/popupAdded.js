import React, {useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import "../SearchCourses/popup.css"
import {PopupContextAdded} from './bachelorForm'

const PopupAdded = ({bachelor,year}) =>{

const added_context = useContext(PopupContextAdded)
const {isAdded, setIsAdded} = added_context


    const closePopup = () =>{
        setIsAdded(false)
       
    }
    return(
        ReactDOM.createPortal(
        <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
          <div className="modalHW">
            <div className="modal-headerAdd">
              <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close"  onClick={closePopup}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
        
            <div className="row headlineAdd">
            <p>Adding courses from </p>
            <p>{bachelor} {year} </p>
            <p>to your study plan</p>
            </div>
          
           <div className="waitText">
           This can take up to 30 seconds. 
           </div>
         
          </div>
        </div>
      </React.Fragment>, document.body
        ))
}
export default PopupAdded