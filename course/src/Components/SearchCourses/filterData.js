/*
function filterData(data, filterinput){
    console.log(filterinput)

  
    data.children.map(school =>{
      school.children.map(dep =>{
        //every dep.children is a list of courses
        const filtered = dep.children.filter(course =>{
              return (course.education_level == filterinput.level || filterinput.level == "") &&
                (course.fullName.includes(filterinput.search_text) || filterinput.search_text == "")
        })
        dep.children = filtered
       // console.log(filtered)
      if (dep.children.length == 0){
        console.log('0')
      }
      })
    })  
  return data
  }*/

  function filterData(dataInput, filterinput){

    const data_copy = Object.assign({}, dataInput);
    
    console.log(filterinput)
  
    data_copy.children.map(school =>{
      school.children.map(dep =>{
        //every dep.children is a list of courses
        const filtered = dep.children.filter(course =>{
              return (course.education_level == filterinput.level || filterinput.level == "") &&
                (course.fullName.includes(filterinput.search_text) || filterinput.search_text == "")
        })
        // set the new filtered list as child på the department
        dep.children = filtered
        // remove the list of courses that are 0
        if (dep.children.length == 0){
          delete dep.children
        }
      })
      // remove the departments that don't have any courses
      // loop through children in reverse to nog update the index value then looping
      for(var i = school.children.length-1; i >= 0; i--){
        if(!('children' in school.children[i])){
          school.children.splice(i, 1)
        }
      }
      // remove the children attribute of the schools if it's empty menaning have nog departments with courses
      if (school.children.length == 0){
        delete school.children
      }
    })
    // remove the schools that don't have any departments with courses
    for(var i = data_copy.children.length-1; i >= 0; i--){
      if(!('children' in data_copy.children[i])){
        data_copy.children.splice(i, 1)
      }
    }
    
  return data_copy
  }
  export {filterData}