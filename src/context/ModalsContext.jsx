import { createContext, useState } from "react";



export const ModalsContext = createContext()

function ModalProvider({children}){
    const [postModalOpen, setPostModalOpen] = useState(false)
    const [viewPostModal, setViewPostModal] = useState(false)
    const [myPosts, setMyPosts] = useState([])
    const [postData, setPostData] = useState({})
    const [navOpen, setNavOpen] = useState(false)

    const togglePostModal = () =>{
        setNavOpen
        setPostModalOpen(!postModalOpen)
    }

    const selectPostData = (authorName,title,music,image) =>{
        const postDataItems = {authorName,title,music,image}
        setPostData(postDataItems)
    }

    const toggleViewPostModal = () =>{
        setViewPostModal(!viewPostModal)
    }

    const toggleNav = () =>{
        setNavOpen(!navOpen)
    }

    const closeNav = () =>{
        setNavOpen(false)
    }

    return(
        <ModalsContext.Provider value={{postModalOpen, togglePostModal,navOpen,toggleNav,viewPostModal,toggleViewPostModal, postData, selectPostData,myPosts,setMyPosts,closeNav}}>{children}</ModalsContext.Provider>
    )
}

export default ModalProvider