import React,{useState} from 'react'
import { useLogin } from './hooks/useLogin'


const Login = () => {
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const {login,error,loading }= useLogin()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        await login(email,password)
    }
    
  return (
    <form onSubmit={handleSubmit} className='flex flex-col my-5 mx-auto p-2 bg-white w-[70%] md:w-[40%] md:mx-auto'>
        <label className='block my-2'>Email:</label>
        <input className='border'
          type='text'
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
        />

        <label className='block my-2'>Password:</label>
        <input className='border'
          type='text'
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
        />

        <button disabled={loading} className='block my-2 bg-green-500 px-4 py-1 text-white'>Log In</button>
        {error && <div className='bg-pink-500'>{error}</div>}
    </form>
  )
}

export default Login