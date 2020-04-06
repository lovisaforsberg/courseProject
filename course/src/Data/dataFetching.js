import React, {useReducer,useEffect} from "react";
import axios from "axios"

const proxy = 'https://cors-anywhere.herokuapp.com/'
const urlProg = 'http://api.kth.se/api/kopps/v2/programme/academic-year-plan/CMETE/HT16'


const initialState = {
    loading:true,
    error:'',
    post:{}
}

const reducer = (state,action) =>{
    switch(action.type){
        case 'FETCH_SUCCESS':
            return{
                loading:false,
                post:action.payload,
                error:''
            }

        case 'FETCH_ERROR':
            return{
                loading:false,
                post:{},
                error: "Something went wrong!"
            }
        default:
            return state
    }
}

function DataFetching(){
    
const [state, dispatch] = useReducer(reducer,initialState)

useEffect(() =>{
    axios
        .get(proxy+urlProg)
        .then(response =>{
            const response_json = response.data
            dispatch({type:'FETCH_SUCCESS', payload: response_json})
        })
        .catch(error =>{
            dispatch({type:'FETCH_ERROR'})
        })
}, [])


    return(
        <div>
            {state.loading? 'Loading' : console.log(state.post.Specs)}
            {state.error ? state.error:null}
        </div>
    )
}
export default DataFetching