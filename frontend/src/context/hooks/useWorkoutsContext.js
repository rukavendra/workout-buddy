import {WorkoutContext,} from '../workoutContext'
import { useContext } from 'react'

export const useWorkoutsContext= ()=>{
    const context = useContext(WorkoutContext)
    if(!context){
        throw Error("useWorkoutsContext must be used inside Provider")
    }
    return context
}