import React, {useState} from 'react'
import { useWorkoutsContext } from '../../context/hooks/useWorkoutsContext'
import { useAuthContext } from '../../context/hooks/useAuthContext'

const Workoutform = () => {
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()
    const [title, setTitle]= useState('')
    const [load, setLoad]= useState('')
    const [reps, setReps]= useState('')
    const [error, setError]= useState(null)

    const handleSubmit= async (e)=>{
        e.preventDefault()
        const workout= {title, load,reps}

        if(!user){
          setError('You must be logged in to create a workout')
          return
        }

        const response = await fetch('http://localhost:4000/workouts', {
            method: "POST",
            body: JSON.stringify(workout),
            headers:{
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log("New Workout added", json)
            dispatch({type:'CREATE_WORKOUT', payload:json})
        }
    }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col h-[50%] my-2 mx-auto p-2 bg-white w-[90%] md:w-[40%] md:mx-3 '>
        <h3 className='font-bold text-xl text-black'>Add a New Workout</h3>
        <label className='block my-2'>Excersize Title:</label>
        <input className='border'
          type='text'
          onChange={(e)=>setTitle(e.target.value)}
          value={title}
        />

        <label className='block my-2'>Load (in Kg):</label>
        <input className='border'
          type='number'
          onChange={(e)=>setLoad(e.target.value)}
          value={load}
        />

        <label className='block my-2'>Reps:</label>
        <input className='border'
          type='number'
          onChange={(e)=>setReps(e.target.value)}
          value={reps}
        />

        <button className='block my-2 bg-green-500 px-4 py-1 text-white'>Add</button>
        {error && <div className='bg-pink-500'>{error}</div>}
    </form>
  )
}

export default Workoutform