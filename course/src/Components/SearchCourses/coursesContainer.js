import React, {useState,useRef, useReducer, useEffect} from "react";
import FilterForm from "./filterForm";
import DisplayData from "./courses_data"

const CoursesContainer = ({data}) => {
  
    const courses = data;

    /*
    useEffect(()=>{
      setCourses(data)
    },[])*/
    console.log(data)
    console.log(courses)
    
  
    //const componentIsMounted = useRef(true);
  
    const [filterInput, setFilterInput] = useReducer(
  
      (state, newState) => ({ ...state, ...newState }),
  
      {
  
        search_text: "",
       
        level: "",
  
        /*period: "",
  
        campus: "",

        language:""*/
  
      }
  
    );

  
    const handleFilterCourses = event => {
      const name = event.target.name;
      const newValue = event.target.value;
      setFilterInput({[name]: newValue });
  };


   
 

  return (

    <>

      <FilterForm

        searchValue={filterInput}

        handleChangeValue={handleFilterCourses}

      />

      <div>
        <h2>Filter Input: </h2>
        
        <DisplayData 
            dataprop={courses} 
            
            filter={filterInput}
            />

      </div>

    </>
    )
  
  }

  export default CoursesContainer