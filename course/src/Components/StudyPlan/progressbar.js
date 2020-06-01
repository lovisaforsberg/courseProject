import React, {useState, useEffect, useReducer, useContext} from 'react';
import {studyplanReducer,initialstate} from "../../reducers/studyplanReducer"
import {ZoomedInContext} from "../StudyPlan/studyPlanContainer"
import './progressbar.css';

/*
const Range = (props) => {
    return (
        // render current the filled range of progress bar along its width
 
        <div className="range" onMouseOver={handleMouseOver(props)}style={{width: `${props.percentRange}%`}}/>

    );
};*/

const ProgressBar = (props) => {
   
const [show, setShow] = useState(false)

const percent = props.percentRange*100/300
const handleMouseEnter = () =>{
    setShow(true)
    console.log(show)
}
const handleMouseLeave = () =>{
    setShow(false)
    console.log(show)
}

    return (
        <div className="progbar_container">
        <div className="hoverDiv" style={props.percentRange > 100?{width:'120px'}:{width:'110px'}}>
            <div className="hoverText">
        {show? props.percentRange + " credits":null} 
            </div>
        </div>
        <div className="progress-bar">
            {/*render available progress bar’s limit*/}
            <div className="range" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{width: `${percent}%`}}/>
        </div>
        <div className="credits">300 credits</div>
        </div>
    );
  };

  function flat (data, allData){
    data.children.map(item =>{
        if('children' in item){
			flat(item, allData)
		}
		else{
			allData.push(item)
		}
    })
}

  const countCredits = (data) =>{
    let allData = []
    var count=0;

    flat(data, allData)

    allData.map(course=>{
        count+=course.size
    })

   return (count)
  }

  export const ProgressBarContainer = () => {
	const zoom_context = useContext(ZoomedInContext)
    const {ZoomedData, setZoomedData} = zoom_context
   
    let zoomDataObj = ZoomedData
    console.log(zoomDataObj)

    const useStudyplanReducer= useReducer(studyplanReducer,initialstate)

    let [percentRange, setProgress] = useState(0);
    let [share, setShare] = useState(0)

    useEffect(()=>{
        setZoomedData(zoomDataObj)
    let countedCredits = countCredits(zoomDataObj)
    setShare(countedCredits)
    setProgress(share)

    },[useStudyplanReducer, zoomDataObj, initialstate])
  
    return (
        <>
        <div className="ProgressContainer" >      
            <ProgressBar percentRange={percentRange}/>
        </div>
        </>
    );
  };