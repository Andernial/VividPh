import { FaPlus } from "react-icons/fa";


import { useContext, useEffect, useState } from "react";
import { ModalsContext } from "../../context/ModalsContext";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { YoutubePlayerContext } from "../../context/YoutublePlayerContext";
import { FetchApi } from "../../utils/Fetch";
import PostModal from "../../components/PostModal";
import CreateModal from "../../components/CreateModal";
import LoadingPosts from "../../assets/images/loading.svg"

function Feed() {
    const [imagesData, setImagesData] = useState([])
    const [requestLoading, setRequestLoading] = useState(false)
    const { postModalOpen, togglePostModal, navOpen,viewPostModal,toggleViewPostModal,selectPostData } = useContext(ModalsContext)
    const { togglePlayer } = useContext(YoutubePlayerContext)
    const myProfile = true
    const cloudName = import.meta.env.VITE_CLOUD_NAME
    const apiUrl = import.meta.env.VITE_API_URL
    
    const getImages = async () => {
        setRequestLoading(true)

        try {
            const request = await FetchApi("GET", `${apiUrl}/post/show-all`,'')
            setImagesData(request.results)
            console.log(request)
        } catch (error) {
            console.log(error)
        }finally{
            setRequestLoading(false)
        }
    }

    // const myImage = cld.image('ud6cefpbtatpo0pbfret').resize(auto().gravity(autoGravity()).width(300).height(300));
    const cld = new Cloudinary({ // setando imagens com o cloudnary
        cloud: {
            cloudName: cloudName
        }
    })


    const handlePostModal = () => {
        togglePlayer('')
        togglePostModal()
    }

    const handleViewPostModal = (authorId,authorName,title,music,image) =>{
        toggleViewPostModal()
        selectPostData(authorId,authorName,title,music,image)
    }

    useEffect(()=>{
        getImages()
    },[])

    return (
        <>
         {viewPostModal ? (
                <PostModal />
            ) : null}
            {postModalOpen ? (
                <CreateModal />
            ) : null}
            <div className=" min-h-svh w-full bg-mainBg relative">
    
                <div className="w-full pt-12">
                    <h1 className="text-black font-bold text-center text-2xl py-7">
                        Fotos Recentes
                    </h1>

                    <div className="w-full flex flex-row flex-wrap justify-center gap-5 p-5">
                    {requestLoading ? <img src={LoadingPosts} alt="loading" className=" size-28" /> : null}

                        {imagesData ? (
                             imagesData.map((images,idx) => (

                                <AdvancedImage  key={idx} cldImg={cld.image(`${images.image_public_id}`).resize(auto().gravity(autoGravity()).width(300).height(300))} className="size-32 cursor-pointer" style={{ border:'10px white solid'}} onClick={()=>{handleViewPostModal(images.user_name,images.post_title,images.post_youtube_url,images.image_public_id)}} /> 
                             ))
                        ) : null}
           
                    </div>

                   

                </div>
          
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
               
            </div>
        </>
    )
}





export default Feed