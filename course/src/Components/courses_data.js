import React, {useState, useEffect} from "react";
const DisplayData=(props)=> {
    const [schools,setSchools] = useState(props);
    const [courses,setCourses] = useState(props);
    useEffect(()=>{
        setSchools(props.schools)
        setCourses(props.courses)
    },[])

  return (
      <>
      <h1>Display Data</h1>
      {Object.entries(schools).map(school =>{
          console.log(school)
      })}
      </>
  )
}
export default DisplayData;