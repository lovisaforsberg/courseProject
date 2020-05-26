import StudyplanContext from "../store"

const all_data = useContext(StudyplanContext);


export const zoomingReducer = (state,action) =>{
    switch (action.type){
        case 'ZOOM_IN':
            const newState1 = {...state}
            return newState1;
        default:
            return state;
        }



}