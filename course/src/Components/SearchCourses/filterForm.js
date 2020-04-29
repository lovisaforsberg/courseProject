import React from "react";
import Checkbox from "./checkbox"
import "./filterForm.css"

const FilterForm = ({ searchValue, handleChangeValue, handleCheckboxes, checkedItems, handleCheckboxesCampus, checkedItemsCampus}) => {
  
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
    }
];

const checkboxesCampus = [
  {
      name: 'AlbaNova',
      key: 'checkBox1',
      label: 'AlbaNova',
  },
  {
      name: 'Campus',
      key: 'checkBox2',
      label: 'Campus',
  },
  {
    name: 'Flemingsberg',
    key: 'checkBox3',
    label: 'Flemingsberg',
  },
  {
      name: 'Kista',
      key: 'checkBox4',
      label: 'Kista',
  },
  {
    name: 'Solna',
    key: 'checkBox5',
    label: 'Solna',
},
{
      name: 'Södertälje',
      key: 'checkBox6',
      label: 'Södertälje',
  },
];

    
  return (

    <div className="filterContainer">
      <div className="row">
        <input
          type="text"
          name="search_text"
          value={searchValue.search_text}
          onChange={e=>handleChangeValue(e)}
          placeholder="Search for courses"
          className="filter-input"
      
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
                    <label key={item.key}>
                        {item.name}
                        <Checkbox name={item.name} checked={checkedItems[item.name]} onChange={handleCheckboxes} />
                    </label>
                ))
            }
        </div>
        </form>
        <form className="filterItem">
        <div className="Checkboxes">
            <label>Choose campus: </label> <br/>
            {
                checkboxesCampus.map(item => (
                    <label key={item.key}>
                        {item.name}
                        <Checkbox name={item.name} checked={checkedItemsCampus[item.name]} onChange={handleCheckboxesCampus} />
                    </label>
                ))
            }
        </div>        

      </form>
      </div>
    </div>

  );
  

};



export default FilterForm;