import React, {createContext, useEffect, useReducer} from 'react'
import {studyplanReducer,initialstate, bachelor_title} from "./reducers/studyplanReducer"

const StudyplanContext = createContext({})

export const StudyplanProvider = ({children}) =>{

    const useStudyplanReducer= useReducer(studyplanReducer,initialstate)
    console.log(initialstate)

    
  useEffect(() => {
    localStorage.setItem("sunburstData", JSON.stringify(initialstate))
    console.log(JSON.parse(localStorage.getItem("sunburstData")))


  }, [useStudyplanReducer]);
    return(
    <StudyplanContext.Provider
    value={useStudyplanReducer}>
    {children}
    </StudyplanContext.Provider>
    )}

export default StudyplanContext;
