import React, {useState, useEffect} from "react";
const DisplayData=(props)=> {
    const [dataset,setDataset] = useState(props);

    useEffect(()=>{
        setDataset(props)
    },[])

  return (
      <>
      <h1>Display Data</h1>
      {console.log(dataset)}
      </>
  )
}
export default DisplayData;