import React, {useReducer} from 'react';
import logo from './logo.svg';
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import Router from './router'
import StudyPlanContext from "./Data/dataSunburst"
import {DataContext} from "./Data/courses"
import {StudyplanProvider} from "./store";
import {studyplanReducer,initialstate} from "./reducers/studyplanReducer"


function App() {
  const useStudyplanState = useReducer(studyplanReducer,initialstate)
  return (
    
    <BrowserRouter>
      <div className='App'>
        <StudyplanProvider value={useStudyplanState}>
        <Router />
        </StudyplanProvider>
      </div>
    </BrowserRouter>
    
  )
}

export default App;
