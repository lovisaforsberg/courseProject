import React, { useContext, useEffect, useRef, useReducer, useState, createContext } from "react";
import ReactDOM from "react-dom";
import studyplanReducer from "./studyPlanContainer"
import * as d3 from 'd3'

import StudyplanContext from "../../store"
import './sunburst.css'

//import useFetch from "../../Data/useFetch"
//import {SunburstContext} from "../../Data/sunburst-context"


const useCourse = () =>{
  const contextValue = useContext(StudyplanContext);
  return contextValue;
}

const Sunburst = ()=> {
  //let sunBurstData = useCourse()
  const [data, dispatch] = useCourse()
  //console.log(data)

  const [isDetailShown, setDetailShown] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState('')

  const showDetail = (course)=>{
    setSelectedCourse(course)
    setDetailShown(true);
  }
  const hideDetail = ()=>{
    setDetailShown(false);
  }


  const clickedCourse = (d) =>{
    const period = d.parent.data.name
    const year = d.parent.parent.data.name
    const level = d.parent.parent.parent.data.name
    const courseObject = {code:d.data.name, level: level, year: year, period: period}
    console.log("clicked")
    dispatch({type: 'DELETE_COURSE', courseObject})
    
  }

  //useContext
//const [state, dispatch] = useContext(SunburstContext);
//const proxy = 'https://cors-anywhere.herokuapp.com/'
//const urlProg = 'http://api.kth.se/api/kopps/v2/programme/academic-year-plan/'
//const urlFetch = proxy + urlProg + state.bachelor + "/" + state.start_year
//useFetch(urlFetch)


//const [data,setData] = useState(props);
const d3Container = useRef(null)
//var dataset = {};
/*
const createDataset = (list) =>{
  console.log(list)
  //for now
  let track = "INMT"

  let bachelor_courses = { year1P1: [], year1P2: [], year1P3: [], year1P4: [],
                  year2P1: [], year2P2: [], year2P3: [], year2P4: [],
                  year3P1: [], year3P2: [], year3P3: [], year3P4: [],}

    list.forEach(element => {
         element.Electivity[0].Courses.forEach(course =>{
             if("ConnectedRound" in course){
              //if(!("SpecCode" in element)){
              if(element.SpecCode === track || !("SpecCode" in element)){
              //course.ConnectedRound.periodInfos.forEach(period =>{
                if(element.StudyYear === 1){
                     if("P1" in course.ConnectedRound){bachelor_courses.year1P1.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P1']})}
                     if("P2" in course.ConnectedRound){bachelor_courses.year1P2.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P2']})}
                     if("P3" in course.ConnectedRound){bachelor_courses.year1P3.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P3']})}
                     if("P4" in course.ConnectedRound){bachelor_courses.year1P4.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P4']})}
                }
                if(element.StudyYear === 2){
                  if("P1" in course.ConnectedRound){bachelor_courses.year2P1.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P1']})}
                  if("P2" in course.ConnectedRound){bachelor_courses.year2P2.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P2']})}
                  if("P3" in course.ConnectedRound){bachelor_courses.year2P3.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P3']})}
                  if("P4" in course.ConnectedRound){bachelor_courses.year2P4.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P4']})}
                }
                if(element.StudyYear === 3){
                  
                    if("P1" in course.ConnectedRound){bachelor_courses.year3P1.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P1']})}
                    if("P2" in course.ConnectedRound){bachelor_courses.year3P2.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P2']})}
                    if("P3" in course.ConnectedRound){bachelor_courses.year3P3.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P3']})}
                    if("P4" in course.ConnectedRound){bachelor_courses.year3P4.push({name: course.Code, courseName:course.Name, size:course.ConnectedRound['P4']})}
                  
                }
                
            }
         }
         })
      
  
    });

var periods1 = [{name: 'p1', children: bachelor_courses.year1P1}, {name: 'p2', children: bachelor_courses.year1P2},
                    {name: 'p3', children: bachelor_courses.year1P3}, {name: 'p4', children: bachelor_courses.year1P4},]
    var periods2 = [{name: 'p1', children: bachelor_courses.year2P1}, {name: 'p2', children: bachelor_courses.year2P2},
                    {name: 'p3', children: bachelor_courses.year2P3}, {name: 'p4', children: bachelor_courses.year2P4},]
    var periods3 = [{name: 'p1', children: bachelor_courses.year3P1}, {name: 'p2', children: bachelor_courses.year3P2},
                    {name: 'p3', children: bachelor_courses.year3P3}, {name: 'p4', children: bachelor_courses.year3P4},]
   
var years = [{name: 'Year 1', children: periods1}, 
  {name: 'Year 2', children: periods2}, 
  {name: 'Year 3', children: periods3}]        

   dataset.name = "bachelor"
   dataset.children = years
  return dataset
}*/

//const fetch = createDataset(DataFetching("CMETE","HT16"))
//console.log(fetch);


useEffect(()=>{

d3.select(".root_sunburst").selectAll('*').remove()

  
//setData(data)

const width = 400
const radius = width / 10

const partition = data => {
    const root = d3.hierarchy(data)
    .sum(d => d.size)
    .sort((a, b) => b.value - a.value);
    return d3.partition()
    .size([2 * Math.PI, root.height + 1])
    (root);
  }

//const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
var color = d3
      .scaleOrdinal()
      .range(['#C65649', '#59A5CC', '#AC66B7', '#68AD7C'])

const format = d3.format(",d");

const arc = d3.arc()
.startAngle(d => d.x0)
.endAngle(d => d.x1)
.padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
.padRadius(radius * 1.5)
.innerRadius(d => d.y0 * radius)
.outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));

const root = partition(data);

root.each(d => d.current = d);

const svg = d3.select(d3Container.current)
    .attr('class', 'root_sunburst')
    .append('svg')
    //.style("width", "100%")
    //.style("height", "auto")
    .style("font", "10px sans-serif");

const g = svg.append("g")
    .attr("transform", `translate(${width/2},${width/2})`);

const path = g.append("g")
  .selectAll("path")
  .data(root.descendants().slice(1))
  .enter().append("path")
  .on('click', function(d){clickedCourse(d)})
    .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
    .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0.4)
    .attr("d", d => arc(d.current));

path.filter(d => d.children)
    .style("cursor", "pointer")
    .on("click", clicked);

path.append("title")
   // .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
    .text(d => `${d.data.courseName}`);


const label = g.append("g")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .style("user-select", "none")
  .selectAll("text")
  .data(root.descendants().slice(1))
  .enter().append("text")
    .attr("dy", "0.35em")
    .attr("fill-opacity", d => +labelVisible(d.current))
    .attr("transform", d => labelTransform(d.current))
    .text(d => d.data.name);

const parent = g.append("circle")
    .datum(root)
    .attr("r", radius)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("click", clicked);

function clicked(p) {
  parent.datum(p.parent || root);

  root.each(d => d.target = {
    x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
    x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
    y0: Math.max(0, d.y0 - p.depth),
    y1: Math.max(0, d.y1 - p.depth)
  });

  const t = g.transition().duration(1500);

  // Transition the data on all arcs, even the ones that aren’t visible,
  // so that if this transition is interrupted, entering arcs will start
  // the next transition from the desired position.
  path.transition(t)
      .tween("data", d => {
        const i = d3.interpolate(d.current, d.target);
        return t => d.current = i(t);
      })
    .filter(function(d) {
      return +this.getAttribute("fill-opacity") || arcVisible(d.target);
    })
      .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0.4)
      .attrTween("d", d => () => arc(d.current));

  label.filter(function(d) {
      return +this.getAttribute("fill-opacity") || labelVisible(d.target);
    }).transition(t)
      .attr("fill-opacity", d => +labelVisible(d.target))
      .attrTween("transform", d => () => labelTransform(d.current));
}

//Aquí se le aumenta el número de arcos que muestra
function arcVisible(d) {
  return d.y1 <= 4 && d.y0 >= 1 && d.x1 > d.x0;
}

function labelVisible(d) {
  return d.y1 <= 5 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
}

function labelTransform(d) {
  const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
  const y = (d.y0 + d.y1) / 2 * radius;
  return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
}


},[data,dispatch])

return (
    <React.Fragment>
    <div className='sunburstContainer'>
        <svg id='sunBurst' width={400} height={400} radius={400/2} ref={d3Container}></svg>
    </div>
        
    </React.Fragment>
  );
}

export default Sunburst;

//onClick={clickedCourse}