import React, {useEffect,} from 'react'
import WorkoutDetails from '../workoutDetails/workoutDetails'
import Workoutform from '../forms/workoutform'
import { useWorkoutsContext } from '../../context/hooks/useWorkoutsContext'
import {useAuthContext} from '../../context/hooks/useAuthContext'

const Home = () => {
    const {workouts,dispatch}= useWorkoutsContext()
    const {user}= useAuthContext()
    useEffect(()=>{
        if(user){
        fetch('https://workout-app-xuea.onrender.com/workouts',{ headers: {'Authorization': `Bearer ${user.token}`}})
        .then((res)=>res.json())
        .then(res=>{
                dispatch({type:'SET_WORKOUTS', payload: res})
        })
        .catch(err=>console.log(err))}

    },[dispatch,user])
  return (<div className='flex flex-col md:flex-row-reverse'>
    <Workoutform/>
    <div className='home flex flex-col md:w-screen'>
        {workouts?
            (<div>
                {workouts.map(workout=>(
                   <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>)
            :<div></div>
        }
    </div>
    </div>
  )
}

export default Home