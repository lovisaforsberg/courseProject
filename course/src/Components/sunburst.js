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
};


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
    .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });




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