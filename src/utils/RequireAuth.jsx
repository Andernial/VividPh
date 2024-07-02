import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export const RequireAuth = ({children}) =>{
    const {isLoggedIn} = useAuth()

    if(isLoggedIn === false){
        console.log('aquiiiiiiiiii')
        return <Navigate to='/Login' />
    }
    return children
}