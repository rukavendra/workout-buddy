import {useState} from "react";
import {useAuthContext} from '../../../context/hooks/useAuthContext'

export const useLogin=()=>{
    const [error,setError]= useState(null)
    const [loading,setLoading]= useState(null)
    const {dispatch}= useAuthContext()

    const login = async(email,password)=>{
        setLoading(true)
        setError(null)
        const response = await fetch('https://workout-buddy-backend-nu.vercel.app/user/login',
        {method: 'POST',
        mode: 'cors',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({email,password}),
        })
        const json = await response.json()
        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){
            // save the user to local storage
            localStorage.setItem('user',JSON.stringify(json))

            //update the auth context
            dispatch({type:'LOGIN', payload: json})
            setLoading(false)
        }
    }

    return {login, loading, error}
}