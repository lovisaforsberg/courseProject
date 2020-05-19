import React, {useState, useEffect, useReducer, useRef, useContext} from 'react';
import * as d3 from 'd3'
import StudyplanContext from "../../../store"
import {studyplanReducer,initialstate} from "../../../reducers/studyplanReducer"
import './radarChart.css';

function setUrl(course_code){
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const urlCourse = 'https://api.kth.se/api/kopps/v2/course/'+course_code+'/detailedinformation?l=en'
    const full_url = proxy+urlCourse
    return full_url
}

  function add(arr, subject, size) {
    const { length } = arr;
    const value = size;
    const found = arr.some(el => el.axis === subject);
    if (!found){ arr.push({axis: subject, value});}
    else{
        const result = arr.find(({axis}) => axis === subject );
        result.value += size
    }
    return arr;
  }

function flatten (data){
    const allCourses = []
    data.children.map(level =>{
        level.children.map(year =>{
            year.children.map(period =>{
                period.children.map(course =>{
                    allCourses.push(course)
                })
                
            })
        })
    })
    return allCourses
}

function createData(data){
    let data_array = flatten(data)
    let axes = []

    data_array.map(course =>{
        if('allInfo' in course){
            course.allInfo.subjects.map(sub =>{
                add(axes, sub, course.size)
            })
        }
        else{
            const course_url = setUrl(course.name)
            var x = fetch(course_url)
            .then((response) => response.json())
            .then((responseJSON) => {
                const fetchedCourse = responseJSON
                fetchedCourse.mainSubjects.map(sub=>{
                    add(axes, sub, course.size)
                })
            })
        }
    })
    console.log(axes)
}

const useCourse = () =>{
    const contextValue = useContext(StudyplanContext);
    return contextValue;
  }

 
export const RadarChart = () => {

    //const [course_data, dispatch]  = useCourse()
    //console.log(course_data)
    //const data = createData(course_data)
    const d3Container = useRef(null)

   // let data = createData(initialstate)
    //console.log(data)
   // let features = []
   // data.map(sub=>{
   //     features.push(sub.axis)
   // })

    //console.log(features)
/*
    useEffect(()=>{

    let svg = d3.select(d3Container.current)
    .append("svg")
    .attr("width", 200)
    .attr("height", 200);

    let radialScale = d3.scaleLinear()
    .domain([0,10])
    .range([0,200]);
    let ticks = [2,4,6,8,10];  

    ticks.forEach(t =>
        svg.append("circle")
        .attr("cx", 200)
        .attr("cy", 200)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", radialScale(t))
    );

    ticks.forEach(t =>
        svg.append("text")
        .attr("x", 205)
        .attr("y", 200 - radialScale(t))
        .text(t.toString())
    );

    function angleToCoordinate(angle, value){
        let x = Math.cos(angle) * radialScale(value);
        let y = Math.sin(angle) * radialScale(value);
        return {"x": 300 + x, "y": 300 - y};
    }

    for (var i = 0; i < features.length; i++) {
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        let line_coordinate = angleToCoordinate(angle, 10);
        let label_coordinate = angleToCoordinate(angle, 10.5);
    
        //draw axis line
        svg.append("line")
        .attr("x1", 300)
        .attr("y1", 300)
        .attr("x2", line_coordinate.x)
        .attr("y2", line_coordinate.y)
        .attr("stroke","black");
    
        //draw axis label
        svg.append("text")
        .attr("x", label_coordinate.x)
        .attr("y", label_coordinate.y)
        .text(ft_name);
    }




    }, [data])
    */

    return (
        <>
        <div className='radarContainer'>
            <svg id='radarChart' ref={d3Container}></svg>
        </div>
        </>
    )
}