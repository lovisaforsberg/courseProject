import React, {useReducer,useEffect, useState, useContext} from "react";
import axios from "axios";
import {SunburstContext} from "./sunburst-context"


const useFetch = (url) => {
    const [state, dispatch] = useContext(SunburstContext);
    
    const setDataFunction = (data) =>{
        dispatch({
        type: "SET_DATA",
        payload: data.Specs
      });
      console.log(data.Specs)
      }

    //const [response, setResponse] = useState(null);
    //const [error, setError] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        
          const res = await fetch(url);
          const json = await res.json();
          setDataFunction(json);
        
      };
      fetchData();
    }, []);
    
  };

  export default useFetch
  
//export default function useFetch(url) {
   // const [data, setData] = useState([]);

   
       
       /* 

      fetch(url, {signal: abortController.signal})
        .then(response => response.json())
        .then(data => setData(data));
        console.log(data)

    
        return function cleanup(){
            abortController.abort()
        }
    }, []);
  
    return data;
  }*/


