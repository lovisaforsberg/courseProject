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
/* ------   WORKING BELOW
  function filterData(dataInput, filterinput){
    
    const data_copy = Object.assign({}, dataInput);
    
    console.log(filterinput)
  
    data_copy.children.map(school =>{
      school.children.map(dep =>{
        //every dep.children is a list of courses
        const filtered = dep.children.filter(course =>{
              return (course.education_level == filterinput.level || filterinput.level == "") &&
                (course.fullName.toLowerCase().includes(filterinput.search_text.toLowerCase()) || filterinput.search_text == "")
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
  }*/

  function checkPeriod(filter){
    var filterValues = []
    for(var key in filter) {
      if(filter[key] === true) {
        filterValues.push(key.valueOf().toString())
      }
     
  }
  return filterValues
  }

  function checkIntersecion(filterArr, courseArr){
    var intersection = courseArr.filter(value => 
      filterArr.includes(value)
    )
    return intersection
  }

  function filterData(dataInput, filterinput, periodinput){
    console.log(periodinput)
   // const data_copy = Object.assign({}, dataInput);
     console.log(filterinput)
     const result = {} //new dataset
     result.name = 'all courses'
     result.color = '#efefef'
     result.children = []
     
    dataInput.children.map(school =>{ //in each school 
      const school_copy = Object.assign({},school)
      school_copy.children = []
      school.children.map(dep =>{ //in each department 
        const dep_copy = Object.assign({},dep)
        //dep_copy.children = []
        //every dep.children is a list of courses --> filtered list of courses
        const filtered = dep_copy.children.filter(course =>{
              return (course.education_level == filterinput.level || filterinput.level == "") 
                && (course.fullName.toLowerCase().includes(filterinput.search_text.toLowerCase()) || 
                    (course.name.toLowerCase().includes(filterinput.search_text.toLowerCase())) || 
                    filterinput.search_text == "")
                && (course.campus == filterinput.campus || filterinput.campus == "")
                && (course.language == filterinput.language || filterinput.language == "")
                && ((checkIntersecion(checkPeriod(periodinput), course.period).length > 0)
                ||(periodinput.P1 == false && periodinput.P2 == false && periodinput.P3 == false && periodinput.P4 == false))
                //&& ( periodinput == [])  //object(key) = value (true/false)
                
        })

        // set the new filtered list as child på the department
        dep_copy.children = filtered
        //dep.children = filtered
        // remove the list of courses that are 0
        if (dep_copy.children.length == 0){
          delete dep_copy.children
        }
        school_copy.children.push(dep_copy) // set dep_copy as child to school_copy
      })
     
      // remove the departments that don't have any courses
      // loop through children in reverse to nog update the index value then looping
      for(var i = school_copy.children.length-1; i >= 0; i--){
        if(!('children' in school_copy.children[i])){
          school_copy.children.splice(i, 1)
        }
      }
      // remove the children attribute of the schools if it's empty menaning have nog departments with courses
      if (school_copy.children.length == 0){
        delete school_copy.children
      }

      result.children.push(school_copy) //add each modified to all schools children array
    })
    // remove the schools that don't have any departments with courses

    for(var i = result.children.length-1; i >= 0; i--){
      if(!('children' in result.children[i])){
        result.children.splice(i, 1)
      }
    }
    console.log(result)
  return result
  
  }
  export {filterData}