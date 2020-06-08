import React, {useContext} from 'react'
import './explanationPopup.css'
//import { PopupContextExplain } from './bachelorForm'
//import { PopupContextExplainRadar } from './radarChart/radarChart'
import { PopupContextExplainBachelor } from './../../App'
import { PopupContextExplainRadar } from './../../App'
import {PopupContextExplainPacked} from './../../App'



import ReactDOM from 'react-dom';

const ExplanationPopup = (props) =>{
    const {popup_context_bachelor} = useContext(PopupContextExplainBachelor)
    const {popupShowBachelor, setPopupShownBachelor} = popup_context_bachelor

    const {popup_context_radar} = useContext(PopupContextExplainRadar)
    const {popupShowRadar, setPopupShownRadar} = popup_context_radar

    const {popup_context_packed} = useContext(PopupContextExplainPacked)
    const {popupShowPacked, setPopupShownPacked} = popup_context_packed


    
const closePopup = () =>{
    setPopupShownBachelor(false)
    setPopupShownRadar(false)
    setPopupShownPacked(false)

}
    return(
        ReactDOM.createPortal(
        <React.Fragment>
           {/*
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
                    You can always remove- and move the courses after adding them. To add track specific or masters courses, 
                    please use the search functionality and add them manually. </div>
            </div>
        </div>
        */}
        
         <div className={props.props.class1}/>
            <div className={props.props.class2} aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className={props.props.class3}>
                <div className={props.props.class4}>
                {/*
                <button type="button" className={props.props.classBtn} data-dismiss="modalE" aria-label="Close" onClick={closePopup}>
                    <span aria-hidden="true">&times;</span>
                </button>*/}
                 <div className={props.props.classBtn}>
                        <i onClick={closePopup} className="cross_icon fas fa-times"></i>
                    </div>
                </div>
                <div className="ExplanationText">{props.props.text}</div>
                <div className="ExplanationText">{props.props.text2}</div>
            </div>
        </div>

        </React.Fragment>, document.body
        )
    )
}
export default ExplanationPopup