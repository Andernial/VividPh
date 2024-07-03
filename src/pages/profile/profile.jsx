import ProfilePic from "../../assets/images/example.jpeg"
import { FaPlus } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import { Cloudinary } from '@cloudinary/url-gen';
import { useContext, useEffect, useState } from "react";
import { ModalsContext } from "../../context/ModalsContext";
import { AdvancedImage } from "@cloudinary/react";
import CreateModal from "../../components/CreateModal";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { YoutubePlayerContext } from "../../context/YoutublePlayerContext";
import PostModal from "../../components/PostModal";
import { FetchApi } from "../../utils/Fetch";
import { useAuth } from "../../context/AuthContext";
import LoadingPosts from "../../assets/images/loading.svg"


function Profile() {
    const { postModalOpen, togglePostModal, navOpen, viewPostModal, toggleViewPostModal, selectPostData, myPosts, setMyPosts } = useContext(ModalsContext)
    const { togglePlayer } = useContext(YoutubePlayerContext)
    const [requestLoading, setRequestLoading] = useState(false)
    const [editingBio, setEditingBio] = useState(false)

    const myProfile = true
    const cloudName = import.meta.env.VITE_CLOUD_NAME
    const { authUser } = useAuth()
    const apiUrl = import.meta.env.VITE_API_URL

    const cld = new Cloudinary({ // setando imagens com o cloudnary
        cloud: {
            cloudName: cloudName
        }
    })

    const getImages = async () => {
        setRequestLoading(true)

        try {
            const request = await FetchApi("GET", `${apiUrl}/post/showUser-post/${authUser.name}`, '')
            setMyPosts(request.results)
            console.log(request)
        } catch (error) {
            console.log(error)
        } finally {
            setRequestLoading(false)
        }
    }


    const handlePostModal = () => {
        togglePlayer('')
        togglePostModal()
    }

    const handleBioEdit = () => {
        setEditingBio(!editingBio)
    }

    const handleViewPostModal = (authorId, authorName, title, music, image) => {
        toggleViewPostModal()
        selectPostData(authorId, authorName, title, music, image)
    }

    useEffect(() => {
        console.log('caiu aqui')
        getImages()
    }, [])

    return (
        <>
            {viewPostModal ? (
                <PostModal />
            ) : null}
            {postModalOpen ? (
                <CreateModal />
            ) : null}
            <div className=" min-h-svh w-full bg-mainBg relative">
                <div
                    className=" w-full flex flex-col justify-center drop-shadow-lg bg-cover md:bg-center md:items-center relative"
                    style={{ height: '50svh' }}
                >
                    {/* Overlay para escurecer a imagem de fundo */}
                    <div className="absolute inset-0 bg-black opacity-50"></div>

                    {/* Conteúdo sobre a imagem */}
                    <div className="w-full flex flex-col justify-center items-center text-center text-white z-30 mt-10">
    
                        <img src={ProfilePic} alt="Foto de Perfil" className={`size-24 rounded-full border-2 border-black cursor-pointer`} />

                        <p className="text-lg font-bold p-1">{authUser.name}</p>
                        <div className="flex items-center justify-center">

                            {editingBio ?
                                <>
                                    <div className="flex flex-col gap-7">
                                        <textarea className="w-full h-32 text-black p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                                        <div className="flex justify-between items-center">
                                        <IoMdClose className=" size-10 cursor-pointer" onClick={handleBioEdit} />
                                        <FaPencilAlt className="size-7 cursor-pointer" onClick={handleBioEdit} />
                                        </div>
                                        
                                    </div>

                                </>
                                : <>
                                    <p className=" w-60 pt-5">Olá eu gosto de tirar muitas fotos e esse é meu perfil !</p>
                                    <FaPencilAlt className="size-7 cursor-pointer" onClick={handleBioEdit} />
                                </>}

                        </div>

                    </div>

                </div>
                <div className="w-full">
                    <h1 className="text-black font-bold text-center text-2xl py-7">
                        {myProfile ? "Minhas fotos" : "Fotos Populares"}
                    </h1>

                    <div className="w-full flex flex-row flex-wrap justify-center gap-5 p-5 md:z-30">

                                {requestLoading ? <img src={LoadingPosts} alt="loading" className="size-10" /> : null}

                        {myPosts ? (
                            myPosts.map((images, idx) => (

                                <AdvancedImage key={idx} cldImg={cld.image(`${images.image_public_id}`).resize(auto().gravity(autoGravity()).width(300).height(300))} className="size-32 cursor-pointer" style={{ border: '10px white solid' }} onClick={() => { handleViewPostModal(images.user_name, images.post_title, images.post_youtube_url, images.image_public_id) }} />
                            ))
                        ) : null}


                    </div>


                </div>
                {myProfile ? (

                    <button
                        className={`flex fixed top-96 right-0 justify-center items-center mt-56 mr-5 size-16 rounded-full transition duration-500 ease-in-out bg-white border-2 border-black hover:bg-slate-300 ${navOpen || postModalOpen ? 'hidden' : ''}`}
                        onClick={() => setTimeout(() => {
                            handlePostModal()
                        }, 400)}
                    >
                        <FaPlus />
                    </button>
                ) : null}


            </div>
        </>
    )
}





export default Profile