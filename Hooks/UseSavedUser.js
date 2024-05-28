import React, { useEffect } from 'react'
import UseAuth from './UseAuth';
import supabase from '../config';

const UseSavedUser = () => {


    const [user,setUser] = useState();

    const AuthData  = UseAuth();

    useEffect(()=>{

            const fetchDetails =async ()=>{
                const dbdata = await supabase
                .from('Users')
                .select(`
                  DetailsId,
                  Details (
                    Id
                  )
                `).eq({'AuthId':AuthData.user?.user?.id})

            console.log(dbdata,"from useSavedUser")
            setUser(dbdata.data)

            }

        if(AuthData.error===null)
            {
               fetchDetails();
            
            }


          
       
    },[]);



  return {saved:user}
   
  
}

export default UseSavedUser