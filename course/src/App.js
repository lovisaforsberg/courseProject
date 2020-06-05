import React, {useReducer, useEffect, createContext, useState} from 'react';
import logo from './logo.svg';
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import Router from './router'
import StudyPlanContext from "./Data/dataSunburst"
import {DataContext} from "./Data/courses"
import {StudyplanProvider} from "./store";
import {studyplanReducer,initialstate} from "./reducers/studyplanReducer"

export const PopupContextExplainBachelor = createContext({})
export const PopupContextExplainRadar = createContext({})
export const PopupContextExplainPacked = createContext({})



function App() {

  //const [useStudyplanState] = useReducer(studyplanReducer,initialstate)
  const [isPopupShownBachelor, setPopupShownBachelor] = useState(false)
  const [isPopupShownRadar, setPopupShownRadar] = useState(false)
  const [isPopupShownPacked, setPopupShownPacked] = useState(false)


  const hidePopup = () => {
    if(isPopupShownBachelor=== true){
       setPopupShownBachelor(false)
    }
    if(isPopupShownRadar === true){
      setPopupShownRadar(false)
    }
    if(isPopupShownPacked === true){
      setPopupShownPacked(false)
    }
  }

  return (
    
    <BrowserRouter>
      <div onClick={hidePopup} className='App'>
      <PopupContextExplainBachelor.Provider value={{ popup_context_bachelor: {isPopupShownBachelor, setPopupShownBachelor}}}>
      <PopupContextExplainRadar.Provider value={{ popup_context_radar: {isPopupShownRadar, setPopupShownRadar}}}>
      <PopupContextExplainPacked.Provider value={{ popup_context_packed: {isPopupShownPacked, setPopupShownPacked}}}>

        <StudyplanProvider>
        <Router />
        </StudyplanProvider>
      </PopupContextExplainPacked.Provider>
      </PopupContextExplainRadar.Provider>
      </PopupContextExplainBachelor.Provider>
      </div>
    </BrowserRouter>
    
  )
}

export default App;
