import { useContext } from "react"
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

function PostModal(){
    const {viewPostModal,toggleViewPostModal,postData} = useContext(ModalsContext)
    const { videoPlaying, togglePlayer, loadingPlayer } = useContext(YoutubePlayerContext)
    

    const cloudName = import.meta.env.VITE_CLOUD_NAME

    const cld = new Cloudinary({ // setando imagens com o cloudnary
        cloud: {
            cloudName: cloudName
        }
    })

    const handlePostModal = () =>{
       toggleViewPostModal()
       togglePlayer('')
    }

    return(
        <div className="fixed h-svh w-full flex flex-col items-center justify-center z-30" style={{ backgroundColor: "rgba(0, 0, 0, 0.355)" }}>
               <div className="bg-transparent flex flex-col justify-center items-center font-extrabold text-white text-2xl shadow-sm  w-full">
                    <div className="flex justify-end w-full p-5">
                        <IoMdClose className="size-9 cursor-pointer" onClick={() => handlePostModal()} />
                    </div>
                        <h1 className="">{postData.title}</h1>
                        <div>
                        <AdvancedImage cldImg={cld.image(`${postData.image}`).resize(auto().gravity(autoGravity()).width(500).height(500))} className="p-5" /> 
                        <YouTubeAudioPlayer videoId={postData.music} />
                        </div>
                        <div className="w-full pl-12">
                        <p className="text-start">{postData.authorName}</p>
                        <div className="flex flex-row items-center gap-10">
                            <p className="text-start">music</p>
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