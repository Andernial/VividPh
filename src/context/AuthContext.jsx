import { createContext, useContext, useState } from "react";



export const AuthContext = createContext()


export function useAuth(){
    return useContext(AuthContext)
}

function AuthProvider({children}){
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn, setIsLoggedin] = useState(false)




    return(
        <AuthContext.Provider value={{authUser,isLoggedIn,setAuthUser,setIsLoggedin}}>{children}</AuthContext.Provider>
    )
}


export default AuthProvider