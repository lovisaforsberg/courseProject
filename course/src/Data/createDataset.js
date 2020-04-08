import React, {useState} from "react"


function createCourseData(dep_list, course_list){
    const  dataset = {} // where we want to create our dataset

    dataset.name = 'all courses'
    dataset.children = []

    // remove courses that are cancelled
    const active_courses = []
    course_list.map(course =>{
        if(course.state !== "CANCELLED"){
          active_courses.push(course)
        }
    })
   
    //school_list.forEach(school =>{
        dep_list.forEach(school_dep =>{ // go through each school
                    const school_departments = [] // list of all departments for each school

            //if(school_dep.name == (school.name).split('/')[1]){ 
                school_dep.departments.forEach(dep =>{ // each department in the school
                    const courses = []
                    
                    active_courses.forEach(course =>{
                        if((course.department).split(' ')[0] == dep.code){
                            courses.push({name: course.code, fullName: course.name})
                        }
                    })
                school_departments.push({name:dep.code, fullName: dep.name, children: courses})
                })
            dataset.children.push({name:school_dep.name, children: school_departments})        
            })

        //})
      

   // })

    
    

    return dataset;
   }

   export { createCourseData };