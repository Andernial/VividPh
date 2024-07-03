import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";



export const AuthContext = createContext()


export function useAuth(){
    return useContext(AuthContext)
}

function AuthProvider({children}){
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn, setIsLoggedin] = useState(false)
    const navigate = useNavigate()


    useEffect(()=>{
        const userSession = JSON.parse(localStorage.getItem('user'))

        if(userSession){
            console.log(userSession, ' o auth user foi updatado')
            setAuthUser(userSession)
            setIsLoggedin(true)
            navigate('/')
        }
    },[])

    return(
        <AuthContext.Provider value={{authUser,isLoggedIn,setAuthUser,setIsLoggedin}}>{children}</AuthContext.Provider>
    )
}


export default AuthProvider