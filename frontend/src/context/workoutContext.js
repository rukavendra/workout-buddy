import { createContext, useReducer} from 'react'

const WorkoutContext = createContext()

export const workoutReducer = (state,action)=>{
    switch(action.type){
        case 'SET_WORKOUTS':
            return  {workouts: action.payload}

        case 'CREATE_WORKOUT':
            return {workouts: [action.payload,...state.workouts]}

        case 'DELETE_WORKOUT':
            return {workouts: state.workouts.filter(workout=>workout._id!==action.payload._id)}

        case 'UPDATE_WORKOUT':
            return {workouts: [...state.workouts,state.workouts.filter(workout=>workout._id===action.payload._id)]}

        default:
            return state
    }

}

const WorkoutContextProvider=({children})=>{
    const [state, dispatch]= useReducer(workoutReducer,{workouts:null})
    return( <WorkoutContext.Provider value={{...state,dispatch}}>
        {children}
    </WorkoutContext.Provider>)
}

export  { WorkoutContext, WorkoutContextProvider,}