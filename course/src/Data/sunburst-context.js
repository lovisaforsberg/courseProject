/*import React, {useReducer,useEffect, createContext, useState} from "react";


export const SunburstContext = createContext();

//const proxy = 'https://cors-anywhere.herokuapp.com/'
//const urlProg = 'http://api.kth.se/api/kopps/v2/programme/academic-year-plan/CMETE/HT16'

const initialState = {
    bachelor:"CMETE",
    start_year:"HT16",
    data:[]
}

const reducer = (state,action) =>{
    switch(action.type){
        case 'CHOOSE_BACHELOR':
            return{
                bachelor: [...state.bachelor, action.payload],
                start_year: [...state.start_year,action.payload]
            }
            case 'SET_DATA':
                return{
                    data: [...state.data, action.payload],
                }
        default:
            return state
    }
}


export const SunburstContextProvider = (props) => {
    const [dataFetched, setDataFetched] = useState([]);
    const [Loading, setLoading] = useState(true);

    const [state, dispatch] = useReducer(reducer, initialState);
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const urlProg = 'http://api.kth.se/api/kopps/v2/programme/academic-year-plan/'

    const urlFetch = proxy + urlProg + state.bachelor + "/" + state.start_year


    useEffect(() => {
    
        fetch(urlFetch)
        .then(response => response.json())
        .then(data => setDataFetched(data));
        setLoading(false)
          
        }, []);

        console.log(dataFetched)

    return (
      <SunburstContext.Provider value={[state, dispatch, dataFetched]}>
        {props.children}
      </SunburstContext.Provider>
    );
  };

*/