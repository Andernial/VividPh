import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export const AlreadyAuth = ({children}) =>{
    const {isLoggedIn} = useAuth()

    if(isLoggedIn === true){
        return <Navigate to='/Login' />
    }
    return children
}