
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

  function checkCampus(filterArr, courseCampus){
    let campus = ""
    //console.log(courseCampus.substring(0,3))

    if(courseCampus.substring(0,3) == "KTH" ){
    campus = courseCampus.slice(4); //remove KTH from campus name
    console.log(campus)
    }
    else if(courseCampus.substring(0,2) == "KI"){
      campus = courseCampus.slice(3);
    }
    else{ 
      campus = courseCampus
      console.log(campus)
    }

    if(filterArr.includes(campus)){
      return true
    }
    else{
      return false
    }
  }

  function filterData(dataInput, filterinput, periodinput, campusinput){
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
                && (checkCampus(checkPeriod(campusinput), course.campus) == true
                || (campusinput.AlbaNova == false && campusinput.Campus == false && campusinput.Flemingsberg == false && campusinput.Kista == false && campusinput.Solna == false && campusinput.Södertälje == false ))
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