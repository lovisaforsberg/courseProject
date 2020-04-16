import React from "react";
//import Checkbox from "./checkbox"

const FilterForm = ({ searchValue, handleChangeValue }) => {
   
    
  return (

    <>

        <select
          defaultValue={searchValue.level}
          onChange={e =>handleChangeValue(e)}
        >
          <option key='Select a school' disabled={true} value={searchValue.level}>
            Level
          </option>
          <option key="BASIC" value="BASIC">
                Basic
            </option>
            <option key="ADVANCED" value="ADVANCED">
                Advanced
            </option>
        </select>

      <form className="filter-container">

        <input
          type="text"
          name="search_text"
          value={searchValue.search_text}
          onChange={e=>handleChangeValue(e)}
          placeholder="Search for courses"
          className="filter-input"
          
        />

        <input type="submit" value="Submit" />
        

      </form>

    </>

  );
  

};



export default FilterForm;