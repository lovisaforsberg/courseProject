import React, {useState,useRef, useReducer, useEffect} from "react";
import FilterForm from "./filterForm";
import DisplayData from "./courses_data"

const CoursesContainer = ({data}) => {

    //const [courses, setCourses] = useState(data);
    //console.log(courses)
    console.log(data)
    
  
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


    const filteredCourses = data
    console.log(filteredCourses)
    console.log(filterInput)

  return (

    <>

      <FilterForm

        searchValue={filterInput}

        handleChangeValue={handleFilterCourses}

      />

      <div>
        <h2>Filter Input: </h2>
        {filteredCourses.map}
        <DisplayData 
            dataprop={filteredCourses} 
            
            filter={filterInput}
            />

        

      </div>

    </>
    )
  
  }

  export default CoursesContainer