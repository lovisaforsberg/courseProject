import React, {useState, useEffect, useRef, useContext, createContext, useCallback} from "react";
import * as d3 from 'd3'
import {filterData} from "./filterData"
import CourseDetail from './courseDetail'
import './courses_data.css'
import {DataContext} from "../../Data/courses"
import {PopupContextExplainPacked} from './../../App'
import explanationTexts from "./../../Data/explanationTexts.json"
import ExplanationPopup from '../StudyPlan/explanationPopup'
import { Default } from 'react-spinners-css';
import './courseDetail.css'



export const DetailContext = createContext({})

const DisplayData=({dataprop})=> {
    const d3Container = useRef(null)
    const legendContainer = useRef(null)
  console.log(dataprop)
    const {popup_context_packed} = useContext(PopupContextExplainPacked)
    const {isPopupShownPacked, setPopupShownPacked} = popup_context_packed

		const showPopup = () =>{
		setPopupShownPacked(true);
		}

    
    const [isDetailShown, setDetailShown] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState('')
    const [isExecuted, setExecuted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [noCourses, setNoCourses] = useState(false)

    const showDetail = (course)=>{
      setSelectedCourse(course)
      setDetailShown(true);
    }

    const hideDetail = ()=>{
      setDetailShown(false);
    }

    const noCoursesFunction = (data) =>{
      if(Object.entries(data).length === 0){
        console.log("no data at all")
      }
      else{
        if(data.children.length == 0){
          console.log("no search items found")
          setNoCourses(true)
        }
        else{
          setNoCourses(false)
        }
      }
      console.log(data)
      /*
      if(data == 0){
        setNoCourses(true)
      }
      else{
        setNoCourses(false)
      }*/
    }

    var data = useContext(DataContext);

    useEffect(()=>{
      d3.select(".root_circle").selectAll('*').remove()
      d3.select(".legend").selectAll('*').remove()

      noCoursesFunction(dataprop)
      var svg = d3.select(d3Container.current),
      margin = 20,
      diameter = +svg.attr("width"),
      g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
      
      const wrap = (text, width) => {
        text.each(function() {
          var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.4, // ems
            y = text.attr("y"),
            x = text.attr("x"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em")
    
          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word)
            }
          }
        });
      }//wrap
      /*
  var color = d3.scaleLinear()
      .domain([-1, 5])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl);
      */
  
  var pack = d3.pack()
      .size([diameter - margin, diameter - margin])
      .padding(2);
  
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
        //.style('fill', function(d){return d.children === undefined ? 'transparent' : d.data.color})
        .style('fill', function(d){return d.data.color})
        .attr("r", function(d) {
          return d.r;
        })
        .attr('align-items', 'center')

       /*
        .on("click", function(d) {return d.children !== undefined ? 
          (zoom(d), 
          d3.event.stopPropagation(),
          console.log('hej')
          ):
          //do this when clicking the course node
          ( showDetail(d.data), 
          //console.log(d), console.log(focus), console.log(d.data),
          // stop from zooming out
          d3.event.stopPropagation());})*/
          
        /*.on('mousemove', function(d) {if (focus !== d) { return d3.select(this).attr('class') == "node node--leaf" ?
          
          ( divTooltip.style('left', d3.event.pageX + 10 + 'px'),
            divTooltip.style('top', d3.event.pageY - 25 + 'px'),
            divTooltip.style('display', 'inline-block'),
            divTooltip.html(d.data.fullName))
            :

            divTooltip.style('display', 'none')
          }})
        .on('mouseout', function(d) {
            divTooltip.style('display', 'none')
          })*/


  
    var text = g.selectAll("text")
      .data(nodes)
      .enter().append("text")
        //.attr("class", "label")
        .attr("class", function(d) { return d.parent ? d.children ? "label" : "label label--leaf" : "label label--root"; })
        .attr("text-anchor", "middle")
        .attr("position", "relative")
        .attr('alignment-baseline', 'baseline')
        .attr('font-family', 'montserrat')
        .attr('fill', '#404040')
        .attr('background', 'white')
        .attr('y', function(d){return -(d.r/4)})
        .attr('x', 0)
        .attr('transform',function(d){return 'translate('+d.r/2+', ' +d.r/2+')'})


        .attr('dy', '.15em')
        .attr('cursor', 'pointer')

        .on('mouseover', function(d){ (d3.select(this)
          .style('font-size', function(d){ return d.children == undefined ? 13: 15}))

        })

        .on('mousemove', function(d) {if (d.children === undefined) { return d3.select(this).attr('class') == "label label--leaf" ?
          
          ( divTooltip.style('left', d3.event.pageX + 10 + 'px'),
            divTooltip.style('top', d3.event.pageY - 25 + 'px'),
            divTooltip.style('display', 'inline-block'),
            divTooltip.html(d.data.fullName))
            :

           divTooltip.style('display', 'none')
        }})
          
        
        .on('mouseout', function(d){return ( d3.select(this)
          .style('font-size', function(d){ return d.children == undefined ? 9: 12})),
          (divTooltip.style('display', 'none'))
        })

        .on("click", function(d) {return d.children !== undefined ? 
          (zoom(d), d3.event.stopPropagation()):
          //do this when clicking the course node
          (showDetail(d.data), 
          // stop from zooming out
          d3.event.stopPropagation()); })
        .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0;})
        .style('font-size', function(d){ return d.children == undefined ? 9: 12})
      
      

      
        //.style("display", function(d) { return d.children !== undefined ? "inline" : "inline"; })
        .style('display', 'inline')
        //.text(function(d) { return d.parent === root ? null : d.data.name; })
        .text(function(d) { return d.data.name; })
       // .call(getBBox)  

        .call(wrap, 100)

      var textBackground =  g.selectAll("text")
      .insert('svg:rect', 'text')
        .attr({
            'x': d => d.bbox.x,
            'y': d => d.bbox.y,
            'width': d => d.bbox.width,
            'height': d => d.bbox.height,
            'class': "bbox"
        });
    
        function getBBox(selection) {
          selection.each(function(d) {
              d.bbox = this.getBBox();
          });
      };



  
    var node = g.selectAll("circle,text");
  
    svg
        .style("background", 'transparent')
        .attr('class', 'root_circle')
        //.enter()
        //.call(function() { zoom(root); })
        .on("click", function() { zoom(root); });
    
    zoom(focus)
  
    zoomTo([root.x, root.y, root.r * 2 + margin]);
  
    function zoom(d) {
      var focus0 = focus; 
      focus = d;
      if(d.height != 0){
      setIsLoaded(true)
      }
  
      var transition = d3.transition()
          //.duration(d3.event.altKey ? 7500 : 750)
          .duration(750)
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
      .attr('cursor', 'default')

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
  {console.log(noCourses)}
  {noCourses?
    <div className="noCoursesText">
      Oh no! No courses macthes your search. 
    </div>
  :null}
    {isLoaded?null:
    <>
          <div className='loadingSpinnerBig'>
          <Default color='#404040' />  
          </div>
          <div className="loadingCoursesText">
          Loading courses...
          </div>
          </>
    }
      
            <div className='circleContainer'>
              {isDetailShown && 
              <DetailContext.Provider value={{isDetailShown, setDetailShown}}>
                <CourseDetail sentCourse={selectedCourse}/>
                </DetailContext.Provider> 
              }
              <svg id='packedCircle' width={600} height={600} radius={600/2} ref={d3Container}></svg>
              <div className='legendAndInfo'>
                <i onClick={showPopup} style={{cursor:'pointer'}} className="far fa-question-circle circleInfoBtn infoButton_icon"></i>
                {isPopupShownPacked &&
					        <ExplanationPopup props={explanationTexts.popups.packed_circle}/>
                }
                <svg id='legend' width={100} height={270} ref={legendContainer}></svg>
              </div>
            </div>

    </>
  )
}
export default DisplayData;