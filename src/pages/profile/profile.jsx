import ProfilePic from "../../assets/images/example.jpeg"
import { FaPlus } from "react-icons/fa";

import { Cloudinary } from '@cloudinary/url-gen';
import { useContext } from "react";
import { ModalsContext } from "../../context/ModalsContext";
import { AdvancedImage } from "@cloudinary/react";
import CreateModal from "../../components/CreateModal";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { YoutubePlayerContext } from "../../context/YoutublePlayerContext";
import PostModal from "../../components/PostModal";

function Profile() {
    const { postModalOpen, togglePostModal, navOpen, viewPostModal,toggleViewPostModal, selectPostData} = useContext(ModalsContext)
    const { togglePlayer } = useContext(YoutubePlayerContext)
    const myProfile = true
    const cloudName = import.meta.env.VITE_CLOUD_NAME

    const cld = new Cloudinary({ // setando imagens com o cloudnary
        cloud: {
            cloudName: cloudName
        }
    })


    const myImage = cld.image('ud6cefpbtatpo0pbfret').resize(auto().gravity(autoGravity()).width(200).height(200));

    const handlePostModal = () => {
        togglePlayer('')
        togglePostModal()
    }

    const handleViewPostModal = (authorId,authorName,title,music,image) =>{
        toggleViewPostModal()
        selectPostData(authorId,authorName,title,music,image)
    }

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
                        <img src={ProfilePic} alt="Foto de Perfil" className={`size-24 rounded-full border-2 border-black`} />
                        <p className="text-lg font-bold p-1">Sabbat</p>
                        <p className=" w-60 pt-5">Olá eu gosto de tirar muitas fotos e esse é meu perfil !</p>
                    </div>

                </div>
                <div className="w-full">
                    <h1 className="text-black font-bold text-center text-2xl py-7">
                        {myProfile ? "Minhas fotos" : "Fotos Populares"}
                    </h1>

                    <div className="w-full flex flex-row flex-wrap justify-center gap-5 p-5 md:z-30">
                       
                       <img src="./src/assets/images/example.jpeg" alt="imagem" className="size-32" style={{ border:'10px white solid'}} onClick={()=>{handleViewPostModal('sabbat','algo','outracoisa','algo','algo')}} />
                       <img src="./src/assets/images/example.jpeg" alt="imagem" className="size-32" style={{ border:'10px white solid'}} />
                       <img src="./src/assets/images/example.jpeg" alt="imagem" className="size-32" style={{ border:'10px white solid'}} />
                       <img src="./src/assets/images/example.jpeg" alt="imagem" className="size-32" style={{ border:'10px white solid'}} />
                       <img src="./src/assets/images/example.jpeg" alt="imagem" className="size-32" style={{ border:'10px white solid'}} />
                       <img src="./src/assets/images/example.jpeg" alt="imagem" className="size-32" style={{ border:'10px white solid'}} />
                    
           
                    </div>


                </div>
                {myProfile ? (
                    <div className={`fixed w-full flex flex-col transition duration-200 scale-100 justify-end items-end z-20 top-3/4 ${postModalOpen ? 'invisible' : null}`}>
                        <button
                            className="flex justify-center items-center mr-5 size-16 rounded-full transition duration-500 ease-in-out bg-white border-2 border-black hover:bg-slate-300"
                            onClick={()=>setTimeout(()=>{
                                handlePostModal()
                            },400)}
                        >
                            <FaPlus />
                        </button>
                    </div>
                ) : null}


            </div>
        </>
    )
}





export default Profile