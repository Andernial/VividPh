import { useContext, useEffect, useState } from "react"
import { ModalsContext } from "../../context/ModalsContext"
import { IoMdClose } from "react-icons/io";
import { FaPlay, FaPause } from "react-icons/fa";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

import { Cloudinary } from '@cloudinary/url-gen';
import YouTubeAudioPlayer from "../YoutubeAudioPlayer";
import { YoutubePlayerContext } from "../../context/YoutublePlayerContext";
import LoadingSvg from "../../assets/images/loading.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function PostModal(){
    const {toggleViewPostModal,postData} = useContext(ModalsContext)
    const { videoPlaying, togglePlayer, loadingPlayer, toggleLoading } = useContext(YoutubePlayerContext)
    const [renderVideo,setRenderVideo] = useState(null)
    
	const navigate = useNavigate();
    const cloudName = import.meta.env.VITE_CLOUD_NAME
    const { authUser } = useAuth()

    const cld = new Cloudinary({ // setando imagens com o cloudnary
        cloud: {
            cloudName: cloudName
        }
    })

    const handlePostModal = () =>{
       toggleViewPostModal()
       togglePlayer('')
       setRenderVideo(false)
       toggleLoading(false)
    }

    const handleProfileClick = (name) =>{
        handlePostModal()

        if(authUser.name === name){
            return navigate('/Profile')
        }
        navigate(`/Profile/${name}`);
    } 

    useEffect(()=>{
        setRenderVideo(true)

    },[])

    return(
        <div className="fixed h-svh w-full flex flex-col items-center justify-center z-30" style={{ backgroundColor: "rgba(0, 0, 0, 0.355)" }}>
               <div className=" bg-postBg p-2 flex flex-col justify-center items-center font-extrabold text-white text-2xl shadow-sm  w-full md:w-1/2">
                    <div className="flex justify-end w-full p-5 md:p-0">
                        <IoMdClose className="size-9 cursor-pointer" onClick={() => handlePostModal()} />
                    </div>
                        <h1 className="">{postData.title}</h1>
                        <div>
                        <AdvancedImage cldImg={cld.image(`${postData.image}`).resize(auto().gravity(autoGravity()).width(500).height(500))} className="p-5" /> 
                        {renderVideo ? <YouTubeAudioPlayer videoId={postData.music} /> : null}
                        </div>
                        <div className="w-full pl-12 md:pl-0">
                        <p className="text-start md:text-center cursor-pointer" onClick={()=>handleProfileClick(postData.authorName)}>Autor: {postData.authorName}</p>
                        <div className="flex flex-row items-center md:justify-center gap-10">
                            <p className="text-start md:text-center">Música</p>
                            {videoPlaying === 'playing' ? <FaPause onClick={() => togglePlayer('paused')} className="cursor-pointer size-7" /> : null}
                            {videoPlaying === 'paused' ? <FaPlay onClick={() => togglePlayer('playing')} className="cursor-pointer size-7" /> : null}
                            {loadingPlayer ? (
             
                                        <img src={LoadingSvg} alt="Carregando" className='size-8' />
                                  
                                ) : null}
                        </div>

                        </div>
                       

               </div>
        </div>
    )
}

export default PostModal