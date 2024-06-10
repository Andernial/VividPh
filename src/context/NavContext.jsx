import { createContext, useState } from "react";


export const NavContext = createContext()


function NavContextProvider({children}){
    const [navOpen, setNavOpen] = useState(false)

    const handleNav = () => {
        setNavOpen(!navOpen)
    }

    return(
        <NavContext.Provider value={{navOpen,handleNav}}>{children}</NavContext.Provider>
    )
}

export default NavContextProvider