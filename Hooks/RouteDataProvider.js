import React,{useEffect,createContext, useState} from 'react'


 export const Store = createContext();
const RouteDataProvider = ({children}) =>{


    const [splashScreenVanish,setSplashScreenVanish] = useState(false);

    return(
        <Store.Provider  value={{splash:{splashScreenVanish,setSplashScreenVanish}}}>
            {children}
        </Store.Provider>
    )

}


export default RouteDataProvider;