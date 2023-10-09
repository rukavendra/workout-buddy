import React from 'react'
import { useWorkoutsContext } from '../../context/hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../../context/hooks/useAuthContext'

const WorkoutDetails = ({workout}) => {
  const {dispatch}= useWorkoutsContext()
  const {user}= useAuthContext()

  const handleDelete= async()=>{
    if(!user){
      return
    }
    const response = await fetch(`http://localhost:4000/workouts/${workout._id}`,{method:"DELETE",headers: {'Authorization': `Bearer ${user.token}`}})
    const json = await response.json()
    if(response.ok){
      dispatch({type:'DELETE_WORKOUT',payload:json})
    }
  }

  const handleUpdate= async()=>{
    const response= await fetch('http://localhost:4000/workouts'+workout._id, {method: 'PATCH'})
    const json = await response.json()
    if(response.ok){
      dispatch({type:'UPDATE_WORKOUT', payload:json })
    }
  }

  return (<div className='flex justify-between items-center my-2 mx-auto p-2 bg-white w-[90%] md:w-[70%]'>
    <div className='flex flex-col  '>
    <h3 className='font-bold text-xl text-green-500'>{workout.title}</h3>
    <h4><strong>Reps: </strong>{workout.reps}</h4>
    <h5><strong>Weight (Kg) :</strong> {workout.load} </h5>
    <p>{formatDistanceToNow( new Date(workout.createdAt))}</p>
</div>
<div className='flex flex-col gap-1'>
<button className=' hover:bg-black hover:bg-opacity-50 py-1 px-2 rounded' onClick={handleDelete}>❌</button>
  <button className=' hover:bg-black hover:bg-opacity-50 py-1 px-2 rounded' onClick={handleUpdate}>✒️</button>
</div>
  
</div>
  )
}

export default WorkoutDetails