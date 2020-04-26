import React, {useState,useRef, useReducer, useEffect, useContext} from "react";
import FilterForm from "./filterForm";
import {filterData} from "./filterData"
import DisplayData from "./courses_data"
import {DataContext} from "../courses"

const CoursesContainer = () => {

    let dataGlobal = useContext(DataContext)
    const [data, setData] = useState(dataGlobal)
    const [checkedItems, setCheckedItems] = useState({P1:false, P2:false, P3:false, P4:false})
    console.log(data)

    const [filterInput, setFilterInput] = useReducer(
      (state, newState) => ({ ...state, ...newState }),
      {
        search_text: "", 
        level: "",
        period: checkedItems,
        campus: "",
        language: "",
      }
    );

    const [filteredData, setFilteredData] = useState({})

  
    const handleFilterCourses = event => {
      const name = event.target.name;
      const newValue = event.target.value;
      setFilterInput({[name]: newValue });
  };

  const handleCheckboxes = event => {
    const name = event.target.name
    const checked = event.target.checked
    setCheckedItems({...checkedItems, [name] : checked });
    setFilterInput({['period']: checkedItems}) //when checkboxes changes, change state of filterInput
  };
  console.log(checkedItems)


   useEffect(()=>{
    setData(dataGlobal)
    setFilteredData(filterData(data, filterInput))

   },[filterInput, checkedItems])
 

  return (

    <>

      <FilterForm

        searchValue={filterInput}

        handleChangeValue={handleFilterCourses}

        handleCheckboxes={handleCheckboxes}
        checkedItems={checkedItems}

      />

      <div>

        <DisplayData 
            dataprop={filteredData}
            filter={filterInput}
        />

      </div>

    </>
    )
  
  }

  export default CoursesContainer