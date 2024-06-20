import { useContext, useRef, useState } from "react"
import { FetchApi } from "../../utils/Fetch"
import YouTubeAudioPlayer from "../YoutubeAudioPlayer"
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { YoutubePlayerContext } from "../../context/YoutublePlayerContext";

import LoadingSvg from "../../assets/images/loading.svg";
import { ModalsContext } from "../../context/ModalsContext";

function CreateModal() {
    const [displayFile, setDisplayFile] = useState(null)
    const [videoUrl, setVideoUrl] = useState('')
    const [renderVideo, setRenderVideo] = useState(false)
    const [formItem, setFormItem] = useState(null)
    const [requestLoading, setRequestLoading] = useState(false)
    const [error, setError] = useState('')
    const { videoPlaying, togglePlayer, loadingPlayer } = useContext(YoutubePlayerContext)
    const { togglePostModal } = useContext(ModalsContext)
    const cloudName = import.meta.env.VITE_CLOUD_NAME
    const apiUrl = import.meta.env.VITE_API_URL
    const postForm = useRef(null)
    const inputRef = useRef(null)

    const selectImage = (files) => {
        setError('')
        let file = files[0]
        if (!file) { return }

        const formData = new FormData()
        setDisplayFile(URL.createObjectURL(file))
        formData.append("file", file)
        formData.append("upload_preset", "hnznzf2v")

        setFormItem(formData)

    }

    const selectvideo = () => {
        const url = inputRef.current.value
        const cleanUrl = url.split('v=')[1]
        if (cleanUrl === videoUrl) { return alert('Url Identica') }
        togglePlayer('')
        setVideoUrl(cleanUrl)
        setRenderVideo(true)
        console.log(cleanUrl)

    }


    const uploadImage = async (e) => {
        e.preventDefault()
        if (!displayFile) { return setError('Nenhuma Imagem Selecionada') }
        setRequestLoading(true)
        const title = postForm.current.titulo.value

        try {
            const request = await FetchApi("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formItem)
            uploadPost(request, title)
            console.log(request)
        } catch (error) {
            console.log(error)
        }finally{
            setRequestLoading(false)
        }
    }

    const uploadPost = async (requestData, title) => {
        const userId = 1 //valor default por agora //
        const data = { title, youtubeUrl: videoUrl, publicId: requestData.public_id, url: requestData.url }
        setRequestLoading(true)

        try {
            const request = await FetchApi("POST", `${apiUrl}/post/create/${userId}`, data)
            console.log(request)
        } catch (error) {
            console.log(error)
        }finally{
            setRequestLoading(false)
        }
    }


    return (
        <div className="fixed h-svh w-full flex flex-col items-center z-30" style={{ backgroundColor: "rgba(0, 0, 0, 0.355)" }}>
            <div className="bg-white flex flex-col justify-center items-center  w-full" style={{ minHeight: '50%', maxHeight: 'fit-content' }}>
                <form ref={postForm} onSubmit={uploadImage} className="flex flex-col justify-center items-center gap-3">
                    <div className="flex justify-end w-full p-5">
                        <IoMdClose className="size-9 cursor-pointer" onClick={togglePostModal} />
                    </div>
                    <label htmlFor="titulo">Título</label>
                    <input type="text" id="titulo" name="titulo" placeholder="escreva algo legal!" className=" p-1 boder-2 bg-slate-200 border-black rounded" />

                    <label htmlFor="url">Vídeo</label>
                    <input type="text" id="url" name="url" ref={inputRef} className=" p-1 boder-2 bg-slate-200 border-black rounded" placeholder="link do vídeo" />
                    <button type="button" className=" bg-slate-300 p-1 hover:bg-slate-400" onClick={selectvideo}>Confirmar Link</button>
                    {error ? <p className=" text-red-600">{error}</p> : null}
                    <div className="size-60 border-2 border-black" id="video">

                        <>
                            <div className="flex flex-col h-full justify-center items-center">
                                {loadingPlayer ? (
                                    <div className='fixed w-full h-full flex flex-col justify-center items-center'>
                                        <img src={LoadingSvg} alt="Carregando" className='size-8' />
                                    </div>
                                ) : null}
                                {renderVideo ? (<YouTubeAudioPlayer videoId={videoUrl} />) : null}
                                {videoPlaying === 'playing' ? <FaPause onClick={() => togglePlayer('paused')} className="fixed cursor-pointer size-9" /> : null}
                                {videoPlaying === 'paused' ? <FaPlay onClick={() => togglePlayer('playing')} className="fixed cursor-pointer size-9" /> : null}
                                {displayFile ? <img src={displayFile} className="h-full w-full border-2 border-black" /> : null}
                            </div>

                        </>


                    </div>
                    <input type="file" accept="image/*" onChange={(e) => { selectImage(e.target.files) }} />
                    <button className="p-1 bg-slate-300 border-1 border-black m-1 hover:bg-slate-400 disabled:opacity-75 disabled:hover:bg-slate-300" type="submit" disabled={!videoUrl || !formItem || requestLoading}>Enviar</button>
                </form>

            </div>
        </div>

    )
}

export default CreateModal