import GenericProfilePic from "../../assets/images/example.jpeg"
import { FaPlus } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import { Cloudinary } from '@cloudinary/url-gen';
import { useContext, useEffect, useRef, useState } from "react";
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
    const [displayFile, setDisplayFile] = useState(null)
    const [formItem, setFormItem] = useState(null)
    const [atualProfilePic, setAtualProfilePic] = useState('generic')
    const [requestLoading, setRequestLoading] = useState(false)
    const [editingPhoto, setEditingPhoto] = useState(false)
    const [myInfo, setMyInfo] = useState(null)
    const [editingBio, setEditingBio] = useState(false)


    const bioTextRef = useRef(null);
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


    const getProfileInfo = async () => {
        setRequestLoading(true)

        try {
            const request = await FetchApi("GET", `${apiUrl}/user/show-by/${authUser.name}`, '')
            setMyInfo(request.results)
            console.log(request)
            if (request.results && request.results.profilePic) {
                console.log('caiu aqui')
                const item = request.results.profilePic
                return setAtualProfilePic(item.publicId)
            }
            setAtualProfilePic('generic')
        } catch (error) {
            console.log(error)
        } finally {
            setRequestLoading(false)
        }
    }

    const saveNewBio = async () => {
        const bioText = bioTextRef.current.value;

        try {
            const object = { description: bioText }
            const request = await FetchApi("PATCH", `${apiUrl}/user/update`, object, authUser.token)
            setMyInfo(request.results)
            console.log(request)

            handleBioEdit()
        } catch (error) {
            console.log(error)
        } finally {
            setRequestLoading(false)
        }
    }


    const selectImage = (files) => {
        let file = files[0]
        if (!file) { return }

        const formData = new FormData()
        setDisplayFile(URL.createObjectURL(file))
        formData.append("file", file)
        formData.append("upload_preset", "hnznzf2v")

        setFormItem(formData)

    }


    
    const uploadImage = async () => {
        if (!displayFile) { return setError('Nenhuma Imagem Selecionada') }
        setRequestLoading(true)

        try {
            const request = await FetchApi("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formItem)
            uploadPost(request)
            console.log(request)
        } catch (error) {
            console.log(error)
        }finally{
            setRequestLoading(false)
        }
    }

    const uploadPost = async (requestData) => {
        const data = { imageId:requestData.public_id ,imageUrl:requestData.url }
        setRequestLoading(true)

        console.log(data)

        try {

            const request = await FetchApi("POST", `${apiUrl}/user/create-pic`, data, authUser.token)
           
            console.log(request)
            setAtualProfilePic(data.imageId)
            handleEditPhotoModal()
        } catch (error) {
            console.log(error)
        }finally{
            setRequestLoading(false)
        }
    }



    const handlePostModal = () => {
        togglePlayer('')
        togglePostModal()
    }

    const handleEditPhotoModal = () => {
        setDisplayFile('')
        setEditingPhoto(!editingPhoto)
    }

    const handleBioEdit = () => {
        setEditingBio(!editingBio)
    }

    const handleViewPostModal = (authorId, authorName, title, music, image) => {
        toggleViewPostModal()
        selectPostData(authorId, authorName, title, music, image)
    }

    useEffect(() => {
        getImages()
        getProfileInfo()
        return () => {
            setMyPosts([]);
        };
    }, [])

    return (
        <>
            { editingPhoto ? (<div className="fixed h-svh w-full flex flex-col items-center justify-center z-30" style={{ backgroundColor: "rgba(0, 0, 0, 0.355)" }}>
                <div className="bg-white flex flex-col items-center font-extrabold text-black text-2xl shadow-sm h-96 w-full">
                    <div className="flex justify-end w-full p-5">
                        <IoMdClose className="size-9 cursor-pointer" onClick={() => handleEditPhotoModal()} />
                    </div>

                    {displayFile ? <img src={displayFile} className={`size-24 rounded-full border-2 border-black cursor-pointer`} /> : null}

                    {atualProfilePic === 'generic' && !displayFile ? <img src={GenericProfilePic} alt="Foto de Perfil" className={`size-24 rounded-full border-2 border-black cursor-pointer`} />
                        :
                        null}

                     {atualProfilePic != 'generic' && !displayFile ?  <AdvancedImage cldImg={cld.image(`${atualProfilePic}`).resize(auto().gravity(autoGravity()).width(300).height(300))} className={`size-24 rounded-full border-2 border-black cursor-pointer`} /> : null}

                   



                    <input type="file" accept="image/*" className="text-sm" onChange={(e) => { selectImage(e.target.files) }} />
                    <button className="p-1 bg-slate-300 border-1 border-black hover:bg-slate-400 disabled:opacity-75 disabled:hover:bg-slate-300 text-lg m-11 cursor-pointer" type="button" onClick={()=> uploadImage()} disabled={ !formItem || requestLoading}>Enviar</button>
                </div>
            </div>) : null}
            


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

                        {atualProfilePic != 'generic' ? <AdvancedImage cldImg={cld.image(`${atualProfilePic}`).resize(auto().gravity(autoGravity()).width(300).height(300))} className={`size-24 rounded-full border-2 border-black cursor-pointer`} onClick={() =>handleEditPhotoModal()} /> 
                            :
                            <img src={GenericProfilePic} alt="Foto de Perfil" className={`size-24 rounded-full border-2 border-black cursor-pointer`} onClick={() =>handleEditPhotoModal()} />}


                        <p className="text-lg font-bold p-1">{authUser.name}</p>
                        <div className="flex items-center justify-center">

                            {editingBio ?
                                <>
                                    <div className="flex flex-col">
                                        <textarea ref={bioTextRef} className="w-full h-20 text-black p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                                        <div className="flex justify-between items-center">
                                            <IoMdClose className=" size-10 cursor-pointer m-5" onClick={handleBioEdit} />
                                            <FaPencilAlt className="size-7 cursor-pointer m-5" onClick={() => saveNewBio()} />
                                        </div>

                                    </div>

                                </>
                                : <>
                                    <div className="flex flex-col items-center">
                                        <p className=" w-60 pt-5">{myInfo ? myInfo.description : null}</p>
                                        <FaPencilAlt className="size-7 cursor-pointer" onClick={handleBioEdit} />
                                    </div>

                                </>}

                        </div>

                    </div>

                </div>
                <div className="w-full">
                    <h1 className="text-black font-bold text-center text-2xl py-7">
                        Minhas fotos 
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
              

                    <button
                        className={`flex fixed top-96 right-0 justify-center items-center mt-56 mr-5 size-16 rounded-full transition duration-500 ease-in-out bg-white border-2 border-black hover:bg-slate-300 ${navOpen || postModalOpen ? 'hidden' : ''}`}
                        onClick={() => setTimeout(() => {
                            handlePostModal()
                        }, 400)}
                    >
                        <FaPlus />
                    </button>
             


            </div>
        </>
    )
}





export default Profile