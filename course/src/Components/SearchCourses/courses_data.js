import React, {useState, useEffect, useRef, useContext, createContext, useCallback} from "react";
import * as d3 from 'd3'
import {filterData} from "./filterData"
import CourseDetail from './courseDetail'
import './courses_data.css'
import {DataContext} from "../../Data/courses"


export const DetailContext = createContext({})

const DisplayData=({dataprop})=> {
    const d3Container = useRef(null)
    const legendContainer = useRef(null)

    
    const [isDetailShown, setDetailShown] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState('')

    const showDetail = (course)=>{
      //e.preventDefault();
      //console.log(course)
      //console.log(typeof course)
      setSelectedCourse(course)
      setDetailShown(true);
    }

    const hideDetail = ()=>{
      //e.preventDefault();
      //console.log(course)
      //console.log(typeof course)
      setDetailShown(false);
    }

    var data = useContext(DataContext);
    //console.log(dataprop)
    //console.log(filter)
   

    useEffect(()=>{

      d3.select(".root_circle").selectAll('*').remove()
      d3.select(".legend").selectAll('*').remove()


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
  
   //var root = filterData(dataprop, filter)
  var root = dataprop
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
        .on("click", function(d) {return d.children !== undefined ? 
          (zoom(d), 
          d3.event.stopPropagation(),
          console.log(d), console.log(focus), console.log('not')
          ):
          //do this when clicking the course node
          (console.log(d.data), showDetail(d.data), console.log(d), console.log(focus),
          // stop from zooming out
          d3.event.stopPropagation());})
        .on('mousemove', function(d) {if (focus !== d) { return d3.select(this).attr('class') == "node node--leaf" ?
          
          ( divTooltip.style('left', d3.event.pageX + 10 + 'px'),
            divTooltip.style('top', d3.event.pageY - 25 + 'px'),
            divTooltip.style('display', 'inline-block'),
            divTooltip.html(d.data.fullName))
            :

            divTooltip.style('display', 'none')
          }})
        .on('mouseout', function(d) {
            divTooltip.style('display', 'none')
          })

  
    var text = g.selectAll("text")
      .data(nodes)
      .enter().append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .attr('font-family', 'montserrat')
        .attr('y', 0)
        .attr('dy', '.35em')

        .on('mouseover', function(d){d3.select(this)
          .style('font-size', function(d){ return d.children == undefined ? 10: 14})}
        )
        .on('mouseout', function(d){d3.select(this)
          .style('font-size', function(d){ return d.children == undefined ? 5: 10})
        })

        .on("click", function(d) {return d.children !== undefined ? 
          (zoom(d), d3.event.stopPropagation()):
          //do this when clicking the course node
          (console.log(d.data), 
          // stop from zooming out
          d3.event.stopPropagation()); })
        .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0;})
        .style('font-size', function(d){ return d.children == undefined ? 5: 10})
        //.style("display", function(d) { return d.children !== undefined ? "inline" : "inline"; })
        .style('display', 'inline')
        .text(function(d) { return d.parent === root ? null : d.data.name; })


  
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
  
      /*
      transition.selectAll("text")
        .filter(function(d) { return d === focus || this.style.display === "inline"; })
          .style("fill-opacity", function(d) { return d === focus ? 1 : 0; })
          //.on("start", function(d) { if (d.parent === focus) {this.style.display = "inline"; }})
          //.on("end", function(d) { if (d.parent !== focus){ this.style.display = "none"; }});
*/
text
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
        }
  
    function zoomTo(v) {
      var k = diameter / v[2]; view = v;
      node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
      circle.attr("r", function(d) { return d.r * k; });
    }

    var divTooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'toolTip')
      .attr('font-family', 'montserrat')




    const legend_data = [
                        {key: 'EECS', name: "Electrical Engineering and Computer Science", value:'#C65649'},
                        {key: 'ITM', name: "Industrial Engineering and Management", value:'#68AD7C'},
                        {key: 'ABE', name: "Architecture and the Built Environment", value:'#AC66B7'},
                        {key: 'CBH', name: "Engineering Sciences in Chemistry, Biotechnology and Health", value:'#E08443'},
                        {key: 'SCI', name: "Engineering Sciences", value:'#59A5CC'},
                        {key: 'XXX', name: "Cooperation with other universities", value:'#CC5BA4'}]


    var legendContainerSVG = d3.select(legendContainer.current)
    .attr('class', 'legend')

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
      .attr('id', function(d){return d.value})
      .attr('transform', function(d, i) {
        //return 'translate(' + i * 65 + ',' + 0 + ')'
        return 'translate(120,' + i * 40 + ')'
      })
      .on('mousemove', function(d) {
        divTooltip.style('left', d3.event.pageX + 10 + 'px')
        divTooltip.style('top', d3.event.pageY - 25 + 'px')
        divTooltip.style('display', 'inline-block')
        divTooltip.html(d.name)
      })
      .on('mouseout', function(d) {
        divTooltip.style('display', 'none')
      })
    //.attr('class', 'legend_active')

    legend
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', function(d, i) {
        return -70
      })
      .attr('y', -18)
      .attr('dy', '3em')
      .text(function(d) {
        return d.key
      })
      .attr('width', 150)

      legend
      .append('rect')
      .attr('x', -100)
      .attr('width', 23)
      .attr('height', 23)
      .attr('fill', function(d) {
        return d.value
      })
  

    },[dataprop])

  return (
      <>
            <div className='circleContainer'>
              {isDetailShown && 
              <DetailContext.Provider value={{isDetailShown, setDetailShown}}>
                <CourseDetail sentCourse={selectedCourse}/>
                </DetailContext.Provider> 
              }
              <svg id='packedCircle' width={600} height={600} radius={600/2} ref={d3Container}></svg>
              <svg id='legend' width={100} height={270} ref={legendContainer}></svg>
            </div>


      </>
  )
}
export default DisplayData;