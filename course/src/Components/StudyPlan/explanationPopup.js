import React, {useContext} from 'react'
import './explanationPopup.css'
import { PopupContextExplain } from './bachelorForm'
import ReactDOM from 'react-dom';

const ExplanationPopup = () =>{
    const {popup_context} = useContext(PopupContextExplain)
    const {popupShow, setPopupShown} = popup_context 

    
const closePopup = () =>{
    setPopupShown(false)
}
    return(
        ReactDOM.createPortal(
        <React.Fragment>
        <div className="modal-overlayE"/>
            <div className="modal-wrapperE" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modalE">
                <div className="modal-headerE">
                <button type="button" className="modal-close-buttonE" data-dismiss="modalE" aria-label="Close" onClick={closePopup}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="ExplanationText">Enter the name of your program and the start year of your studies in order to 
                    automatically add all compulsory bachelor courses in your program into the study plan.
                    You can always remove and move the courses after adding them. To add track specific or masters courses, 
                    please use the search functionality and add them manually. </div>
            </div>
        </div>
        </React.Fragment>, document.body
        )
    )
}
export default ExplanationPopup