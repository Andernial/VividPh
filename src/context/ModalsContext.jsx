import { createContext, useState } from "react";



export const ModalsContext = createContext()

function ModalProvider({children}){
    const [postModalOpen, setPostModalOpen] = useState(false)
    const [navOpen, setNavOpen] = useState(false)

    const togglePostModal = () =>{
        setPostModalOpen(!postModalOpen)
    }

    const toggleNav = () =>{
        setNavOpen(!navOpen)
    }

    return(
        <ModalsContext.Provider value={{postModalOpen, togglePostModal,navOpen,toggleNav}}>{children}</ModalsContext.Provider>
    )
}

export default ModalProvider