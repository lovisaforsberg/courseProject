import React, {useState,useRef, useReducer, useEffect, useContext} from "react";
import Sunburst from "./sunburst";
import NavBar from '../Navbar'
import {useFetchCourses} from '../../Data/useFetchCourses'
import StudyplanContext from '../../store'

//changing the dataset


function GetBachelorCourses (sunburstData, prog, year){
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const urlProg = 'http://api.kth.se/api/kopps/v2/programme/academic-year-plan/'+prog+'/'+year

        const [fetchedProg, loadningFetch] = useFetchCourses(proxy+urlProg)
        console.log(fetchedProg)
return fetchedProg
    }

const StudyPlanContainer = () => {
    const contextValue = useContext(StudyplanContext);

    //let sunBurstData = useContext(studyPlanContext)
    //console.log(sunBurstData[0])
    //let dataprops = sunBurstData[0]


    return(
        <>
        <NavBar></NavBar>
        <Sunburst></Sunburst>
        <button style={{margin:'200px'}} onClick={()=>GetBachelorCourses(contextValue, 'CMETE', 'HT16')}>BACHELOR</button>

        </>
    )

}

export default StudyPlanContainer
