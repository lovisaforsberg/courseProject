import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";



const Test = () =>{
  const [page, setPage] = useState(1);
  const [Courses, setCourses] = useState([]);
  const [Schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const url = 'https://api.kth.se/api/kopps/v2/courses?l=en'
  const urlSchools = 'https://api.kth.se/api/kopps/v2/schools'
  const urlCourse = 'https://api.kth.se/api/kopps/v2/course/'

  var fetched_courses = [];
  var fetched_schools = [];
  var course_details = [];
  var dataset = [];
  var course_list = []
  var school_list = []
  

/*
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchUrl() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}*/


  async function fetchAll() {
    const response = await fetch(proxy+url);
    const response2 = await fetch(proxy+urlSchools);
    const courses_json = await response.json();
    const schools_json = await response2.json();
    setSchools(schools_json);
    setCourses(courses_json);
    setIsLoading(false);  
    //console.log(schools_json);
    //console.log(courses_json);
  }

  async function fetchSchools(){
    const response = await fetch(proxy+urlSchools);
    const schools_json = await response.json();
    setSchools(schools_json);
    setIsLoading(false);
   // console.log(schools_json)

  }



    useEffect(()=>{
        fetchAll();
        Schools.map(school =>{
          school_list.push(school)
        })

        Courses.map(course=>{
          if(course.state != "CANCELLED"){
            course_list.push(course)
            }  
          })


    
    /*
    fetch(proxy+url,{ 
      method: "GET",
        })
      .then(res => res.json())
      .then(response => {
        processResponse(response)
        /*response.map(course =>{
          if(course.state != "CANCELLED"){
            //console.log(course)
            fetched_courses.push(course)
            
          }
        })
        setIsLoading(false);
        setCourses(response);
        //console.log(fetched_courses);
      })
      .catch(error => console.log(error));
    

      fetch(proxy+urlSchools,{ 
        method: "GET",
          })
        .then(res => res.json())
        .then(response => {
          processResponse(response)
          setIsLoading(false);
          /*
          response.map(school =>{
            fetched_schools.push(school)
          })
          setSchools(response);
        })
        .catch(error => console.log(error));*/

  },[]);


  const createLists = () =>{
  Courses.map(course=>{
      if(course.state != "CANCELLED"){
        course_list.push(course)
        }  
  })
  Schools.map(school =>{
    school_list.push(school)
  })
  }
  //createLists();
  //console.log("Course List")
  //console.log(course_list)
  //console.log("School List")
  //console.log(school_list)

/*
  const fetchSchools = () =>{
    fetch(proxy+urlSchools,{ 
      method: "GET",
        })
      .then(res => res.json())
      .then(response => {
        response.map(school =>{
          fetched_schools.push(school)
        })
        setSchools(fetched_schools);
        setIsLoading(false);
        console.log(fetched_schools);
      })
      .catch(error => console.log(error));
  }
/*
  const fetchDetailedInfo = (course_code) =>{
    var courseUrl = urlCourse+ course_code;
    fetch(proxy+courseUrl,{ 
      method: "GET",
        })
      .then(res => res.json())
      .then(response => {
          course_details.push(response)
        setIsLoading(false);
        console.log(course_details);
      })
      .catch(error => console.log(error));
  }

  

  //fetchSchools();
  
  const createDataset = (courses,schools) =>{
    courses.map(course =>{
      schools.map(school =>{
        //console.log(course.department.split(" ")[1].slice(1,-1))
        //console.log(school.name)
        if(course.department.split(" ")[1].slice(1,-1) == school.name){
          dataset.push({school:school.name, dep:course.department.split(" ")[0], course_code:course.code, course_name:course.name})
        }
        
      })
    })
    console.log(dataset)
  }

 // createDataset(courses,schools);
  /*response.map(school =>{
    fetched_courses.map(course =>{
      if(school.name == course.department.split(" ")[1].slice(1,-1)){
        fetched_schools.push(course)
      }
    })
  })*/


  return (
    <div>
      <h1> KTH Course Search </h1>
      {isLoading && <p>Loading courses</p>}
      {Schools.map(school =>(
        <p>{school.name}</p>
      ))}

      {Courses.map(course =>{
        if(course.state !== "CANCELLED"){
          course_list.push(course)
        }})}
        <p>{course_list.length}</p>
      

    </div>
  );
}

export default Test