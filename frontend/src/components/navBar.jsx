import React from 'react'
import { Link  } from 'react-router-dom'
import { useLogout } from './pages/hooks/useLogOut'
import { useAuthContext } from '../context/hooks/useAuthContext'


const NavBar = () => {
  const {logout}= useLogout()
  const {user}= useAuthContext()
  const handleLogout=()=>{
    logout()
  }
  return (
    <header className='shadow max-w-full font-extrabold bg-white text-3xl'>
        <div className='flex items-center justify-between p-4'>
            <Link to='/' >Workout Partner</Link>
              <nav>
                {user?
                (<div className='font-normal text-base flex gap-x-2'>
                  <span>{(user.email).slice(0,10)}</span>
                  <button className='font-normal text-xl text-green-500 border border-green-500 py-1 px-3 hover:text-lg' onClick={handleLogout}>Log Out</button>
                </div>):
                (<div className='font-normal text-xl flex gap-x-2'>
                  <Link to='/signup'>SignUp</Link>
                  <Link to='/login'>LogIn</Link>
                </div>)}
              </nav>
        </div>
    </header>
  )
}

export default NavBar