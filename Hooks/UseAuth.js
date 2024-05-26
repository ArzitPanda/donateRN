import React, { useEffect, useState } from 'react'
import supabase from '../config'

const UseAuth = () => {

const [user,setUser] =useState(null)
const [error,setError] = useState(null);

useEffect(()=>{


const fetchUser = async ()=>{


    const authData = await supabase.auth.getUser();

if(authData.error)
{
setError(authData.error)
}
else
{
    setUser(authData.data);
}

}
fetchUser()




},[])

  return {user,error}
}

export default UseAuth