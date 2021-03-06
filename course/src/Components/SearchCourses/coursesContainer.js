import React, {useState,useRef, useReducer, useEffect, useContext} from "react";
import FilterForm from "./filterForm";
import {filterData} from "./filterData"
import DisplayData from "./courses_data"
import {DataContext} from "../../Data/courses"
import usePersistedState from "../../Data/usePersistedState"


const CoursesContainer = () => {

    let dataGlobal = useContext(DataContext)
    const [data, setData] = useState(dataGlobal)
    const [checkedItems, setCheckedItems] = useState({P1:false, P2:false, P3:false, P4:false, P5:false})
    const [checkedItemsCampus, setCheckedItemsCampus] = useState({AlbaNova:false, Campus:false, Flemingsberg:false, Kista:false, Solna:false, Södertälje:false})
    //console.log(data)
  const [isLoaded, setIsLoaded] = useState(false)

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

  const handleCheckboxesCampus = event => {
    const name = event.target.name
    const checked = event.target.checked
    setCheckedItemsCampus({...checkedItemsCampus, [name] : checked });
    setFilterInput({['campus']: checkedItemsCampus}) //when checkboxes changes, change state of filterInput
  };
  //console.log(checkedItems)

  const handleOnChangeCampus = (selectedList, selectedItem) =>{
      if(checkedItemsCampus[selectedItem.value] == true){
        setCheckedItemsCampus({...checkedItemsCampus,[selectedItem.value]:false})
      }
      else if(checkedItemsCampus[selectedItem.value] == false){
        setCheckedItemsCampus({...checkedItemsCampus,[selectedItem.value]:true})
      }
    setFilterInput({['campus']: checkedItemsCampus})
  }


   useEffect(()=>{
    setData(dataGlobal)
    setFilteredData(filterData(data, filterInput, checkedItems, checkedItemsCampus))
    setIsLoaded(true)
    //console.log(filteredData)

   },[filterInput, checkedItems, checkedItemsCampus])
 
  

  return (

    <>

      <FilterForm

        searchValue={filterInput}
        handleChangeValue={handleFilterCourses}
        handleCheckboxes={handleCheckboxes}
        checkedItems={checkedItems}
        handleCheckboxesCampus={handleCheckboxesCampus}
        checkedItemsCampus={checkedItemsCampus}
        handleOnChangeCampus={handleOnChangeCampus}

      />


        <DisplayData 
            dataprop={filteredData}
            filter={filterInput}
        />

    </>
    )
  
  }

  export default CoursesContainer