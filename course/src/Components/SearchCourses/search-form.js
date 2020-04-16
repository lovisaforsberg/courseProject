import React, {useState, useEffect} from "react";
import Checkbox from "./checkbox"

function SearchForm() {
 const [searchText, setSearchText] = useState("");
 const [checkedItems, setCheckedItems] = useState({})
 const [searchResults, setSearchResults] = useState({});

 const handleTextInput = event => {
    setSearchText(event.target.value);
    console.log(searchText)
    //skicka till extern filtrering med usecontext?
  };
  const handleCheckboxes = event => {
    setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
    //skicka till extern filtrering med usecontext?
  };

  console.log("checkedItems: ", checkedItems);

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



  return (
      <React.Fragment>
    <div className="Search">
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={handleTextInput}
      />

    

    </div>
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
</React.Fragment>
  );
}
export default SearchForm