import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as d3 from 'd3'



const Test = () =>{
  const [page, setPage] = useState(1);
  const [Courses, setCourses] = useState([]);
  const [Prog_course, setProg_course] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const d3Container = useRef(null)


  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const url = 'https://api.kth.se/api/kopps/v2/courses?l=en'
  const urlSchools = 'https://api.kth.se/api/kopps/v2/schools'
  const urlCourse = 'https://api.kth.se/api/kopps/v2/course/'
  const urlProg = 'http://api.kth.se/api/kopps/v2/programme/academic-year-plan/CSAMH/HT16'

  var fetched_courses = [];
  var fetched_schools = [];
  var course_details = [];
  var dataset = {};
  var course_list = []
  var prog_list = []
  

  async function fetchAll() {
   // const response = await fetch(proxy+url);
    const response2 = await fetch(proxy+urlProg);
   // const courses_json = await response.json();
    const prog_json = await response2.json();
    setProg_course(prog_json.Specs);
   // setCourses(courses_json);
    setIsLoading(false);  
    
    prog_list = prog_json.Specs;
    createDataset(prog_list)
    //console.log(Prog_course)
    //console.log(courses_json);
  }

  async function fetchSchools(){
    const response = await fetch(proxy+urlProg);
    const prog_json = await response.json();
    setProg_course(prog_json);
    setIsLoading(false);
   // console.log(schools_json)

  }

  const createDataset = (list) =>{
    //for now
    let track = "INMT"

    let bachelor_courses = { year1P1: [], year1P2: [], year1P3: [], year1P4: [],
                    year2P1: [], year2P2: [], year2P3: [], year2P4: [],
                    year3P1: [], year3P2: [], year3P3: [], year3P4: [],}

      list.forEach(element => {
           element.Electivity[0].Courses.forEach(course =>{
               if("ConnectedRound" in course){
                if(element.SpecCode == track || !("SpecCode" in element)){
                course.ConnectedRound.periodInfos.forEach(period =>{
                  if(element.StudyYear == 1){
                       if(period.code == 'P1'){bachelor_courses.year1P1.push({name: course.Name, size:period.credits})}
                       if(period.code == 'P2'){bachelor_courses.year1P2.push({name: course.Name, size:period.credits})}
                       if(period.code == 'P3'){bachelor_courses.year1P3.push({name: course.Name, size:period.credits})}
                       if(period.code == 'P4'){bachelor_courses.year1P4.push({name: course.Name, size:period.credits})}
                  }
                  if(element.StudyYear == 2){
                    if(period.code == 'P1'){bachelor_courses.year2P1.push({name: course.Name, size:period.credits})}
                    if(period.code == 'P2'){bachelor_courses.year2P2.push({name: course.Name, size:period.credits})}
                    if(period.code == 'P3'){bachelor_courses.year2P3.push({name: course.Name, size:period.credits})}
                    if(period.code == 'P4'){bachelor_courses.year2P4.push({name: course.Name, size:period.credits})}
                  }
                  if(element.StudyYear == 3){
                    
                      if(period.code == 'P1'){bachelor_courses.year3P1.push({name: course.Name, size:period.credits})}
                      if(period.code == 'P2'){bachelor_courses.year3P2.push({name: course.Name, size:period.credits})}
                      if(period.code == 'P3'){bachelor_courses.year3P3.push({name: course.Name, size:period.credits})}
                      if(period.code == 'P4'){bachelor_courses.year3P4.push({name: course.Name, size:period.credits})}
                    
                  }
                  
               })
              }
           }
           })
        
    
      });
      console.log(bachelor_courses)
      const years = [{name: 'year1', children: [bachelor_courses.year1P1, bachelor_courses.year1P2, bachelor_courses.year1P3, bachelor_courses.year1P4]}, 
                      {name: 'year2', children: [bachelor_courses.year2P1, bachelor_courses.year2P2, bachelor_courses.year2P3, bachelor_courses.year2P4]}, 
                      {name: 'year3', children: [bachelor_courses.year3P1, bachelor_courses.year3P2, bachelor_courses.year3P3, bachelor_courses.year3P4]}]

      dataset.name = 'all_courses';
      dataset.children = [{name: 'bachelor', children: years}, {name: 'master', children: []}];

      return dataset
  }



    useEffect(()=>{
        fetchAll();

      //const data = createDataset(prog_list);
      //console.log(data)

      var data = {
        "name": "TOPICS", "children": [{
            "name": "Topic A",
            "children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
        }, {
            "name": "Topic B",
            "children": [{"name": "Sub B1", "size": 3}, {"name": "Sub B2", "size": 3}, {
                "name": "Sub B3", "size": 3}]
        }, {
            "name": "Topic C",
            "children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
        }]
    };

       const width = 932;
       const radius = width / 8;

       const partition = data => {
            const root = d3.hierarchy(data)
            .sum(d => d.size)
            .sort((a, b) => b.value - a.value);
             return d3.partition()
            .size([2 * Math.PI, root.height + 1])
            (root);
         }

        const arc = d3.arc()
         .startAngle(d => d.x0)
         .endAngle(d => d.x1)
         .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
         .padRadius(radius * 1.5)
         .innerRadius(d => d.y0 * radius)
         .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

       // const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
       var color = d3
       .scaleOrdinal()
       .range(['#876f91', '#274156', '#BDC4A1', '#689FA3'])

        const format = d3.format(",d")
      

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

            .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name);})

            .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
            .attr("d", d => {arc(d.current); console.log(d.current);});
      
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
      
        return svg.node();
      
        
    

  },[]);

/*
  const createLists = () =>{
  Courses.map(course=>{
      if(course.state != "CANCELLED"){
        course_list.push(course)
        }  
  })
  Schools.map(school =>{
    school_list.push(school)
  })
  }*/
  //createLists();
  //console.log("Course List")
  //console.log(course_list)
  //console.log("School List")
  //console.log(school_list)




  return (
    <React.Fragment>
    <div>
      <h1> KTH Course Search HEJ </h1>
      {isLoading && <p>Loading courses</p>}
      {prog_list.map(prog =>(
        <p>{prog.specs}</p>
      ))}

      {Courses.map(course =>{
        if(course.state !== "CANCELLED"){
          course_list.push(course)
        }})}
        <p>{course_list.length}</p>
        <svg id='sunBurst' width={932} height={932} radius={932/2} ref={d3Container}></svg>
        


    </div>
    </React.Fragment>
  );
}

export default Test