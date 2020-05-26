import React, { useContext, useEffect, useRef, useReducer, useState, createContext } from "react";
import ReactDOM from "react-dom";
import studyplanReducer from "./studyPlanContainer"
import * as d3 from 'd3'
import StudyplanContext from "../../store"
import './sunburst.css'
import {useFetchCourses} from '../../Data/useFetchCourses'
import {useInput} from "../SearchCourses/useInput"
import StudyPlanDetails from './studyPlanDetails'
import {ZoomedInContext} from './studyPlanContainer'

//import useFetch from "../../Data/useFetch"
//import {SunburstContext} from "../../Data/sunburst-context"

export const StudyplanDetailContext = createContext({})


const useCourse = () =>{
  const contextValue = useContext(StudyplanContext);
  return contextValue;
}




const Sunburst = ()=> {
  
  const zoom_context = useContext(ZoomedInContext)
  const {ZoomedData, setZoomedData} = zoom_context

  //let sunBurstData = useCourse()
  const [data, dispatch] = useCourse()
  //console.log(data)
  

  const [isDetailShown, setDetailShown] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState({})


  const showDetail = (course, color)=>{
    course.data.color = color
    course.data.period = course.parent.data.name
    course.data.year = course.parent.parent.data.name
    course.data.level = course.parent.parent.parent.data.name

    setSelectedCourse(course.data)
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
    dispatch({type: 'DELETE_COURSE', courseObject})
    
  }

  const getZoomed = () =>{

  }

/*
  const AddBachelor = (prog, year, track) =>{
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const urlProg = 'http://api.kth.se/api/kopps/v2/programme/academic-year-plan/'+prog+'/'+year
    //const [fetchedProg, loadningFetch] = useFetchCourses(proxy+urlProg)
    
  var x = fetch(proxy+urlProg)
  .then((response) => response.json())
  .then((responseJSON) => {
     // do stuff with responseJSON here...
     const fetchedProg = responseJSON.Specs
     dispatch({type: 'ADD_BACHELOR', fetchedProg, track})
  });
    
    
    
  }*/


const d3Container = useRef(null)


useEffect(()=>{
  console.log(data)

d3.select(".root_sunburst").selectAll('*').remove()
  
//setData(data)

const width = 400
const radius = width / 10


const partition = data => {
    const root = d3.hierarchy(data)
    .sum(d => d.size)
    //.sort((a, b) => b.value - a.value);
    .sort(function(a, b) { return d3.ascending(a.name, b.name); })

    return d3.partition()
    .size([2 * Math.PI, root.height + 1])
    (root);
  }
  
//const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
var color = d3
      .scaleOrdinal()
      .range(['#CC5BA4', '#C65649', '#EAD94C', '#68AD7C', '#59A5CC'])

const format = d3.format(",d");

const arc = d3.arc()
.startAngle(d => d.x0)
.endAngle(d => d.x1)
.padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
.padRadius(radius * 1.5)
.innerRadius(d => d.y0 * radius)
.outerRadius(d => (Math.max(d.y0 * radius, d.y1 * radius - 1)));

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
  .on('click', function(d){showDetail(d, d.parent.data.color)})
    .attr("fill", d => { while (d.depth > 2) d = d.parent; if(d.depth==1){return '#e2e0e0'}else{ return d.data.color}; })
    //.attr('fill', function(d) {return color(d.data.name)})
    //.attr("fill-opacity", d => arcVisible(d.current) ? (d.parent ? 1 : 0.8) : 0.4)
    .attr("fill-opacity", function(d){if(d.depth==2){return 0.8}if(d.depth==3){return 0.7}if(d.depth==4){return 0.5}} )
    .attr("d", d => arc(d.current))
    .on('mousemove', function(d) {return d.children === undefined ?
      (divTooltip.style('left', d3.event.pageX + 10 + 'px'),
      divTooltip.style('top', d3.event.pageY - 25 + 'px'),
      divTooltip.style('display', 'inline-block'),
      divTooltip.html(d.data.name+': '+d.data.courseName)):null
      
    })
    .on('mouseout', function(d) {
      divTooltip.style('display', 'none')
    })

path.filter(d => d.children)
    .style("cursor", "pointer")
    .on("click", clicked);

    /*
path.append("title")
   // .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
    //.text(d => `${d.data.courseName}`);
    .text('hejhej')
    */

var divTooltip = d3
  .select('body')
  .append('div')
  .attr('class', 'toolTip')
  .attr('font-family', 'montserrat')


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
    .style('cursor', 'pointer')
    .on("click", clicked)
/*
  g.append("g")
  .selectAll("circle")
  .text('back')
 // .text(function(d){return d.current.data.name})
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'middle')
  .style('font-size', '12px')
  .style("cursor", "pointer")
  .attr("pointer-events", "all")
  .on("click", function(d){console.log(d.current)});*/

const textParent = g.append("text")
  .datum(root)
  .html('Go back')
  .attr('id', 'backText')
  .attr('class', 'zoomedOut')
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'middle')
  .attr('font-family', 'montserrat')
  .attr("pointer-events", "all")
  .attr('fill', '#404040')
  .on("click", clicked)
  .style('font-size', '12px')
  .style('cursor', 'pointer')

  



function clicked(p) {
  parent.datum(p.parent || root);
  textParent.datum(p.parent || root);

  if(p.depth === 0){
    document.getElementById('backText').setAttribute("class", "zoomedOut")
  }
  else{
    document.getElementById('backText').setAttribute("class", "zoomedIn")
  }
  
  
  console.log(p.data)
  setZoomedData(p.data)

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
      //.attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0.4)
      .attr("fill-opacity", function(d){if(d.depth==2){return 0.8}if(d.depth==3){return 0.7}if(d.depth==4){return 0.5}} )

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


},[data])

return (
    <React.Fragment>
    <div className='sunburst'>
    {isDetailShown && 
              <StudyplanDetailContext.Provider value={{isDetailShown, setDetailShown}}>
                <StudyPlanDetails sentCourse={selectedCourse}/>
                </StudyplanDetailContext.Provider> 
              }
        <svg id='sunBurst' width={400} height={400} radius={400/2} ref={d3Container}></svg>
    </div>
        
    </React.Fragment>
  );
}

export default Sunburst;

//onClick={clickedCourse}