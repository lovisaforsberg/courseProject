import React, {createContext, useEffect, useReducer} from 'react'
import {studyplanReducer,initialstate} from "./reducers/studyplanReducer"

const StudyplanContext = createContext({})

export const StudyplanProvider = ({children}) =>{

    const useStudyplanReducer= useReducer(studyplanReducer,initialstate)
    console.log(initialstate)
    
  useEffect(() => {
    localStorage.setItem("sunburstData", JSON.stringify(initialstate))
  }, [useStudyplanReducer]);
    return(
    <StudyplanContext.Provider
    value={useStudyplanReducer}>
    {children}
    </StudyplanContext.Provider>
    )}

export default StudyplanContext;
