import React, {useState, useEffect, useReducer} from 'react';
import {studyplanReducer,initialstate} from "../../reducers/studyplanReducer"
import './progressbar.css';

const Range = (props) => {
    return (
        // render current the filled range of progress bar along its width
 
        <div className="range" style={{width: `${props.percentRange}%`}}/>

    );
};

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            {/*render available progress bar’s limit*/}
            <Range percentRange={props.percentRange}/>
           

        </div>
    );
  };

  const countCredits = (data) =>{
    var count=0;
    const levels = initialstate.children

    levels.map(level =>{
        level.children.map(year =>{
            year.children.map(period=>{
                //console.log(period)
                period.children.map(course=>{
                    count+=course.size
                })
                    
                })
            })
        })
       // console.log(count/300)
   return ((count/300))
  }
  export const ProgressBarContainer = () => {
    const useStudyplanReducer= useReducer(studyplanReducer,initialstate)
   // console.log(initialstate)

    let [percentRange, setProgress] = useState(0);

    useEffect(()=>{
    var share = countCredits(initialstate)
    setProgress(share*100)
    },[useStudyplanReducer])
  
    return (
        <>
        <div className="ProgressContainer" >      
            <ProgressBar percentRange={percentRange}/>
        </div>
        </>
    );
  };