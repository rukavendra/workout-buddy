import { useAuthContext } from "../../../context/hooks/useAuthContext"
import { useWorkoutsContext } from "../../../context/hooks/useWorkoutsContext"

export const useLogout =()=>{
    const {dispatch}= useAuthContext()
    const {dispatch:workoutDispatch}= useWorkoutsContext()
    const logout =()=>{
        // remove token from storage
        localStorage.removeItem('user')
        
        //dispatch logout function
        dispatch({type:'LOGOUT'})
        workoutDispatch({type:'SET_WORKOUTS', payload: null})
        }
    
    return {logout}
}