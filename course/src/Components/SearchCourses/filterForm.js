import React from "react";
//import Checkbox from "./checkbox"

const FilterForm = ({ searchValue, handleChangeValue }) => {
   
    
  return (

    <>

      <form className="filter-container">

        <input
          type="text"
          name="search_text"
          value={searchValue.search_text}
          onChange={e=>handleChangeValue(e)}
          placeholder="Search for courses"
          className="filter-input"
          
        />


        <input

          type="text"
          name="level"
          value={searchValue.level}
          onChange={e=>handleChangeValue(e)}
          placeholder="level"
          className="filter-input"

        />
        <input type="submit" value="Submit" />
        

      </form>

    </>

  );
  

};



export default FilterForm;