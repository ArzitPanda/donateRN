import React, { useEffect, useState } from 'react'
import supabase from '../config'
import { useNavigation } from '@react-navigation/native'


const UseAuth = () => {
const navigation = useNavigation();
const [user,setUser] =useState(null)
const [error,setError] = useState(null);

useEffect(()=>{


const fetchUser = async ()=>{


    const authData = (await supabase.auth.getUser());

if(authData.error)
{
  console.log(authData.error)
setError(authData.error)
}
else
{
  
    setUser(authData.data);
    navigation.navigate("Home")

}
console.log(authData)
}
fetchUser()




},[])

  return {user,error}
}

export default UseAuth