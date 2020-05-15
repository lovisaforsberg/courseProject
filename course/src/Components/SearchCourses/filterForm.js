import React from "react";
import Checkbox from "./checkbox"
import "./filterForm.css"
import { Multiselect } from 'multiselect-react-dropdown';

const FilterForm = ({ searchValue, handleChangeValue, handleCheckboxes, checkedItems, handleOnChangeCampus}) => {
  
  const checkboxes = [
    {
        name: 'P1',
        key: 'checkBox1',
        label: 'P1',
    },
    {
        name: 'P2',
        key: 'checkBox2',
        label: 'P2',
    },
    {
        name: 'P3',
        key: 'checkBox3',
        label: 'P3',
    },
    {
        name: 'P4',
        key: 'checkBox4',
        label: 'P4',
    },
    {
      name: 'P5',
      key: 'checkBox5',
      label: 'Summer',
  }
];

const campusOptions = [
  {
      text: 'AlbaNova',
      key: 'checkBox1',
      value: 'AlbaNova',
  },
  {
      text: 'Campus',
      key: 'checkBox2',
      value: 'Campus',
  },
  {
    text: 'Flemingsberg',
    key: 'checkBox3',
    value: 'Flemingsberg',
  },
  {
      text: 'Kista',
      key: 'checkBox4',
      value: 'Kista',
  },
  {
    text: 'Solna',
    key: 'checkBox5',
    value: 'Solna',
},
{
      text: 'Södertälje',
      key: 'checkBox6',
      value: 'Södertälje',
  },
];

    
  return (

    <div className="filterContainer">
      <div className="row">
      <div className='searchIcon'></div>
        <input
          type="text"
          name="search_text"
          value={searchValue.search_text}
          onChange={e=>handleChangeValue(e)}
          placeholder="Search for courses"
          className="textInput"
          id="textInput"
      
        />
      </div>
      <div className="row container">
        <div className="filterItem dropdown">
        <select
          name = 'level'
          defaultValue={searchValue.level}
          onChange={e =>handleChangeValue(e)}
        >
          <option key='Select a school' disabled={true} value={searchValue.level}>
            Level
          </option>
          <option key="" value="">
                All
          </option>
          <option key="BASIC" value="BASIC">
                Basic
            </option>
            
            <option key="ADVANCED" value="ADVANCED">
                Advanced
            </option>
        </select>
        </div>
        <div className="filterItem dropdown">
        <select
          name = 'language'
          defaultValue={searchValue.language}
          onChange={e =>handleChangeValue(e)}
        >
          <option key='Select language' disabled={true} value={searchValue.language}>
            Language
          </option>
          <option key="" value="">
                All
          </option>
          <option key="Engelska" value="Engelska">
                English
          </option>
          <option key="Svenska" value="Svenska">
               Swedish
            </option>

        </select>
        </div>

      <form className="filterItem">

        <div className="Checkboxes">
            <label>Choose period: </label> <br/>
            {
                checkboxes.map(item => (
                    <label key={item.key} className="checkboxContainer">
                        <text>{item.label}</text>
                        <Checkbox name={item.name} checked={checkedItems[item.name]} onChange={handleCheckboxes} />
                        <span className="checkmark"></span>
                    </label>
                ))
            }
        </div>
        </form>

      <div className="filterItem dropdown">
      <Multiselect
        options={campusOptions} // Options to display in the dropdown
        placeholder="Filter campus"
        onSelect={handleOnChangeCampus} // Function will trigger on select event
        onRemove={handleOnChangeCampus} 
        displayValue="text" // Property name to display in the dropdown options
/>
      </div>
      </div>
    </div>

  );
  

};



export default FilterForm;