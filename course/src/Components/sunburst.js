import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as d3 from 'd3'



const Sunburst = props =>{
//console.log(data.data.name);
const d3Container = useRef(null)
const [data, setData] = useState(props);
console.log(data.children)

useEffect(()=>{
setData(props);
/*
 var nodeData = {
    name: "TOPICS", children: [{
        name: "Topic A",
        children: [{name: "Sub A1", size: 7.5}, {name: "Sub A2", size: 7.5}]
    }, {
        name: "Topic B",
        children: [{name: "Sub B1", size: 7.5}, {name: "Sub B2", size: 7.5}, {
            name: "Sub B3", size: 0.4}]
    }, {
        name: "Topic C",
        children: [{name: "Sub A1", size: 7.5}, {name: "Sub A2", size: 7.5}]
    }]
};*/

const width = 600
const radius = width / 8

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
    .append('svg')
    .style("width", "100%")
    .style("height", "auto")
    .style("font", "10px sans-serif");

const g = svg.append("g")
    .attr("transform", `translate(${width / 2},${width / 2})`);

const path = g.append("g")
  .selectAll("path")
  .data(root.descendants().slice(1))
  .enter().append("path")
  .on('click', function(d){console.log(d.data.courseName)})
    .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
    .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
    .attr("d", d => arc(d.current));

path.filter(d => d.children)
    .style("cursor", "pointer")
    .on("click", clicked);

path.append("title")
    .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

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
      .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
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
  return d.y1 <= 4 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
}

function labelTransform(d) {
  const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
  const y = (d.y0 + d.y1) / 2 * radius;
  return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
}

//return svg.node();

/*
var width = 500;  // <-- 1
var height = 500;
var radius = Math.min(width, height) / 2;  // < -- 2
var color = d3.scaleOrdinal(d3.schemeCategory10);   // <-- 3

const svg = d3.select(d3Container.current)
.append('svg')
.style("width", "100%")
.style("height", "auto")
.style("font", "10px sans-serif");

const g = d3.select('svg')  // <-- 1
.attr('width', width)  // <-- 2
.attr('height', height)
.append('g')  // <-- 3
.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');  // <-- 4

const partition = d3.partition()  // <-- 1
.size([2 * Math.PI, radius]);  // <-- 2

const root = d3.hierarchy(data)  // <-- 1
.sum(function (d) {return d.size});  // <-- 2


partition(root);
console.log(partition(root));
var arc = d3.arc()
    .startAngle(function (d) {return d.x0 })
    .endAngle(function (d) {return d.x1 })
    .innerRadius(function (d) {return d.y0 })
    .outerRadius(function (d) {return d.y1 });

// Put it all together
g.selectAll('path')
    .data(root.descendants())
    .enter().append('path')
    .attr("display", function (d) { return d.depth ? null : "none"; })
    .attr("d", arc)
    .style('stroke', '#fff')
    .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
    .on('click', function(d) {console.log((d.children ? d : d.parent).data.name)});

*/

    //return svg.node();
},[props])

return (
    <React.Fragment>
    <div>
        <svg id='sunBurst' width={932} height={932} radius={932/2} ref={d3Container}></svg>
    </div>
    </React.Fragment>
  );
}

export default Sunburst