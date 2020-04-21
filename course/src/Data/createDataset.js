import React, {useState} from "react"

function createCourseData(dep_list, fall_courses, spring_courses){
    const  dataset = {} // where we want to create our dataset
    dataset.name = 'all courses'
    dataset.color = '#efefef'
    dataset.children = []
    
    // Education and Communication in Engineering Science verkar inte längre ge någor kurser, 
    // kanske inte finns kvar?
    const active_schools = [{school: "Electrical Engineering and Computer Science", color_school:'#C65649', color_dep: '#D0746A', color_course: '#DA938B'},
                            {school: "Industrial Engineering and Management", color_school:'#68AD7C', color_dep: '#83BB93', color_course: '#9ECAAB'},
                            {school: "Architecture and the Built Environment", color_school:'#AC66B7', color_dep: '#BB81C4', color_course: '#CA9DD1'},
                            {school: "Engineering Sciences in Chemistry, Biotechnology and Health", color_school:'#E08443', color_dep: '#E59A65', color_course: '#EBB087'},
                            {school: "Engineering Sciences", color_school:'#59A5CC', color_dep: '#77B5D5', color_course: '#95C5DE'},
                            {school: "Cooperation with other universities", color_school:'#CC5BA4', color_dep: '#DE96C5', color_course: '#E7B4D5'}]

    active_schools.forEach(school =>{
        const school_departments = [] // list of all departments for each school
        dep_list.forEach(school_dep =>{ // go through each school
            
            if(school_dep.name == school.school){ 
                school_dep.departments.forEach(dep =>{ // each department in the school
                    const courses = []
                    
                    fall_courses.forEach(course =>{
                        
                        if(course.department_code == dep.code){
                        // if the course already exists in courses, 
                        // existing_course will be the course objects, otherwise it will be undefined
                        let existing_course = courses.find(courses => courses.name === course.course_code) 
                        if(existing_course == undefined){
                            courses.push({name: course.course_code, 
                                        fullName:course.course_name_en, 
                                        period: [course.first_period.slice(-2)], 
                                        campus: course.campus, 
                                        education_level: course.educational_level_en,
                                        course_director: course.course_director_name,
                                        size: 10,
                                        color: school.color_course
                                    })
                        }
                        
                        // if course already exists, add the period to the first course object
                        else{
                            existing_course.period.push(course.first_period.slice(-2))
                        }
                        
                        }
                    })

                    // do the same for spring courses
                    spring_courses.forEach(course =>{
                        if(course.department_code == dep.code){
                        // if the course already exists in courses, 
                        // existing_course will be the course objects, otherwise it will be undefined
                        let existing_course = courses.find(courses => courses.name === course.course_code) 
                        if(existing_course === undefined){
                            courses.push({name: course.course_code, 
                                        fullName:course.course_name_en, 
                                        period: [course.first_period.slice(-2)], 
                                        campus: course.campus, 
                                        education_level: course.educational_level_en,
                                        course_director: course.course_director_name,
                                        value: 10})
                        }
                        // if course already exists, add the period to the first course object
                        else{
                            existing_course.period.push(course.first_period.slice(-2))
                        }
                        }
                    })
                // add courses as children to each department
                school_departments.push({name:dep.name, code: dep.code, color: school.color_dep, children: courses})
                
                })   
            }
        })
        // add departments as children to each school
        dataset.children.push({name:school.school, color: school.color_school, children: school_departments})  
    })
    return dataset;
   }
/*

function createCourseDataFirst(dep_list, course_list){
    const  dataset = {} // where we want to create our dataset

    dataset.name = 'all courses'
    dataset.children = []
    
    const active_schools = ["Electrical Engineering and Computer Science",
                            "Industrial Engineering and Management",
                            "Architecture and the Built Environment",
                            "Education and Communication in Engineering Science",
                            "Engineering Sciences in Chemistry, Biotechnology and Health",
                            "Engineering Sciences",
                            "Cooperation with other universities"]

    // remove courses that are cancelled
    const active_courses = []
    course_list.map(course =>{
        if(course.state !== "CANCELLED"){
          active_courses.push(course)
        }
    })
   
    active_schools.forEach(school =>{
        const school_departments = [] // list of all departments for each school
        dep_list.forEach(school_dep =>{ // go through each school
            
            if(school_dep.name == school){ 
                school_dep.departments.forEach(dep =>{ // each department in the school
                    const courses = []
                    
                    active_courses.forEach(course =>{
                        if((course.department).split(' ')[0] == dep.code){
                            courses.push({name: course.code, value: 10})
                        }
                    })
                school_departments.push({name:dep.code, fullName: dep.name, children: courses})
                })   
            }
        })
      dataset.children.push({name:school, children: school_departments})  

    })

    return dataset;
   }
*/
   export { createCourseData };