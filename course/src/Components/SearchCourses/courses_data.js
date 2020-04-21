import React, {useState, useEffect, useRef} from "react";
import * as d3 from 'd3'
import {filterData} from "./filterData"


const DisplayData=({dataprop,filter})=> {
    const d3Container = useRef(null)
    const legendContainer = useRef(null)
    console.log(dataprop)
    console.log(filter)
   

    useEffect(()=>{

      d3.select(".root_circle").selectAll('*').remove()


      var svg = d3.select(d3Container.current),
      margin = 20,
      diameter = +svg.attr("width"),
      g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
  
  var color = d3.scaleLinear()
      .domain([-1, 5])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl);
  
  var pack = d3.pack()
      .size([diameter - margin, diameter - margin])
      .padding(2);
  
    var root = filterData(dataprop, filter)
  
    root = d3.hierarchy(root)
        .sum(function(d) { return d.size; })
        .sort(function(a, b) { return b.value - a.value; });
  
    var focus = root,
        nodes = pack(root).descendants(),
        view;
  
    var circle = g.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
        .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
        //.style("fill", function(d) { return d.children ? color(d.depth) : '#eec1bc'; })
        .style('fill', function(d){return d.data.color})
        .on("mouseover", function(d){console.log(d)})
        .on("click", function(d) { if (focus !== d) {return zoom(d), d3.event.stopPropagation();} });
  
    var text = g.selectAll("text")
      .data(nodes)
      .enter().append("text")
        .attr("class", "label")
        .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
        .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
        .text(function(d) { return d.parent === root ? null : d.data.name; });
  
    var node = g.selectAll("circle,text");
  
    svg
        .style("background", 'transparent')
        .attr('class', 'root_circle')
        .on("click", function() { zoom(root); });
  
    zoomTo([root.x, root.y, root.r * 2 + margin]);
  
    function zoom(d) {
      var focus0 = focus; focus = d;
  
      var transition = d3.transition()
          .duration(d3.event.altKey ? 7500 : 750)
          .tween("zoom", function(d) {
            var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
            return function(t) { zoomTo(i(t)); };
          });
  
      transition.selectAll("text")
        .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
          .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
          .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
          .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }
  
    function zoomTo(v) {
      var k = diameter / v[2]; view = v;
      node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
      circle.attr("r", function(d) { return d.r * k; });
    }

    const legend_data = [
                        {key: "Electrical Engineering and Computer Science", value:'#C65649'},
                        {key: "Industrial Engineering and Management", value:'#68AD7C'},
                        {key: "Architecture and the Built Environment", value:'#AC66B7'},
                        {key: "Engineering Sciences in Chemistry, Biotechnology and Health", value:'#E08443'},
                        {key: "Engineering Sciences", value:'#59A5CC'},
                        {key: "Cooperation with other universities", value:'#CC5BA4'}]


    var legendContainerSVG = d3.select(legendContainer.current)

    var legend = legendContainerSVG
      .append('g')
      .attr('class', 'circle_legend')
      .attr('font-family', 'montserrat')
      .attr('font-size', 11)
      .attr('text-anchor', 'start')
      .attr('display', 'block')
      .selectAll('g')
      .data(legend_data)
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        //return 'translate(' + i * 65 + ',' + 0 + ')'
        return 'translate(120,' + i * 40 + ')'
      })
    //.attr('class', 'legend_active')

    legend
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', function(d, i) {
        return 185
      })
      .attr('y', -21)
      .attr('dy', '3em')
      .text(function(d) {
        return d.key
      })
      .attr('width', 150)

      legend
      .append('rect')
      .attr('x', 200)
      .attr('width', 23)
      .attr('height', 23)
      .attr('fill', function(d) {
        return d.value
      })
  

    },[filter])

  return (
      <>
      <div>
        <h1>Display Data</h1>
            
            <svg id='legend' width={400} height={400} ref={legendContainer}></svg>
            <svg id='packedCircle' width={600} height={600} radius={600/2} ref={d3Container}></svg>
      </div>
      </>
  )
}
export default DisplayData;