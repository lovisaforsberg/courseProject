import React, {useState, createContext} from "react";



const createDataset = (list) =>{
    //for now
    let track = "VLM"
    let dataset = {}

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
                  
              // })
              }
           }
           })
        
    
      });
      //console.log(bachelor_courses.year1P1)
     // console.log(bachelor_courses)
    /*  const years = [{name: 'year1', children: [bachelor_courses.year1P1, bachelor_courses.year1P2, bachelor_courses.year1P3, bachelor_courses.year1P4]}, 
                      {name: 'year2', children: [bachelor_courses.year2P1, bachelor_courses.year2P2, bachelor_courses.year2P3, bachelor_courses.year2P4]}, 
                      {name: 'year3', children: [bachelor_courses.year3P1, bachelor_courses.year3P2, bachelor_courses.year3P3, bachelor_courses.year3P4]}]

      dataset.name = 'all_courses';
      dataset.children = [{name: 'bachelor', children: years}, {name: 'master', children: []}];
*/



var periods1 = [{name: 'p1', children: bachelor_courses.year1P1}, {name: 'p2', children: bachelor_courses.year1P2},
                      {name: 'p3', children: bachelor_courses.year1P3}, {name: 'p4', children: bachelor_courses.year1P4},]
      var periods2 = [{name: 'p1', children: bachelor_courses.year2P1}, {name: 'p2', children: bachelor_courses.year2P2},
                      {name: 'p3', children: bachelor_courses.year2P3}, {name: 'p4', children: bachelor_courses.year2P4},]
      var periods3 = [{name: 'p1', children: bachelor_courses.year3P1}, {name: 'p2', children: bachelor_courses.year3P2},
                      {name: 'p3', children: bachelor_courses.year3P3}, {name: 'p4', children: bachelor_courses.year3P4},]
     
var years = [{name: 'Year 1', children: periods1}, 
    {name: 'Year 2', children: periods2}, 
    {name: 'Year 3', children: periods3}]        

     //dataset.name = "bachelor"
     //dataset.children = years

     dataset.name = 'all courses'
     dataset.children = [{name: 'bachelor', children: years}, {name:'master', children: []}]

    return dataset
  }

  export {createDataset}