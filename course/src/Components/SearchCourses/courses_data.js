import React, {useState, useEffect, useRef} from "react";
import * as d3 from 'd3'
import {filterData} from "./filterData"


const DisplayData=({dataprop,filter})=> {
    const d3Container = useRef(null)
    console.log(dataprop)
    console.log(filter)
   

    useEffect(()=>{

      

        let data = filterData(dataprop,filter)
        //let data = dataprop
        /*
        if(document.getElementById('circles')){
          d3.select('.circles').remove()
        }*/
          
        var chart = d3.select('.circles').selectAll('*')
        chart.remove()
        
        
        let view;
        let width = 932
        let height = width
        let format = d3.format(",d");
        /*
        let color = d3.scaleLinear()
            .domain([0, 5])
            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
            .interpolate(d3.interpolateHcl)
        */

        var color = d3
            .scaleOrdinal()
            .range(['#ffffff', '#59A5CC', '#AC66B7', '#68AD7C'])

  var pack = data => d3.pack()
    .size([width, height])
    .padding(3)
    (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))

    var root = pack(data);
    let focus = root;

  //const svg = d3.create("svg")
  var svg = d3.select(d3Container.current)
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .attr('class', 'circles')
      .attr('id', 'circles')
      .style("display", "block")
      .style("margin", "0 -14px")
      .style("background", color(0))
      .style("cursor", "pointer")
      .on("click", () => zoom(root));

  var node = svg.append("g")
    .selectAll("circle")
    .data(root.descendants().slice(1))
    .enter().append('circle')
      .attr("fill", d => d.children ? color(d.depth) : "white")
      .attr("pointer-events", d => !d.children ? "none" : null)
      .on("mouseover", function(d) { d3.select(this).attr("stroke", "#000"); })
      //.on('mouseover', function(){})
      .on("mouseout", function() { d3.select(this).attr("stroke", null); })
      .on("click", d => focus !== d && (zoom(d), d3.event.stopPropagation()));

  var label = svg.append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .on('mouseover', function(d){console.log(d.data.fullName)})
    .selectAll("text")
    .data(root.descendants())
    .enter().append('text')
      .style("fill-opacity", d => d.parent === root ? 1 : 0)
      .style("display", d => d.parent === root ? "inline" : "none")
      .text(d => d.data.name);

  zoomTo([root.x, root.y, root.r * 2]);

  function zoomTo(v) {
    var k = width / v[2];

    view = v;

    label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);
  }

  function zoom(d) {
    var focus0 = focus;

    focus = d;

    var transition = svg.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

    label
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  //return svg.node();

    },[filter])

  return (
      <>
      <div>
        <h1>Display Data</h1>
            <svg id='packedCircle' width={932} height={932} radius={932/2} ref={d3Container}></svg>
        
      </div>
      </>
  )
}
export default DisplayData;