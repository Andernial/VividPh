import { createContext, useState } from "react";



export const ModalsContext = createContext()

function ModalProvider({children}){
    const [postModalOpen, setPostModalOpen] = useState(false)
    const [viewPostModal, setViewPostModal] = useState(false)
    const [myPosts, setMyPosts] = useState([])
    const [postData, setPostData] = useState({})
    const [navOpen, setNavOpen] = useState(false)

    const togglePostModal = () =>{
        setPostModalOpen(!postModalOpen)
    }

    const selectPostData = (authorName,title,music,image) =>{
        const postDataItems = {authorName,title,music,image}
        setPostData(postDataItems)
    }

    const toggleViewPostModal = () =>{
        setViewPostModal(!viewPostModal)
        console.log('ta indo o clik')
    }

    const toggleNav = () =>{
        setNavOpen(!navOpen)
    }

    return(
        <ModalsContext.Provider value={{postModalOpen, togglePostModal,navOpen,toggleNav,viewPostModal,toggleViewPostModal, postData, selectPostData,myPosts,setMyPosts}}>{children}</ModalsContext.Provider>
    )
}

export default ModalProvider