import { useContext, useRef, useState } from "react"
import { FetchApi } from "../../utils/Fetch"
import YouTubeAudioPlayer from "../YoutubeAudioPlayer"
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { YoutubePlayerContext } from "../../context/YoutublePlayerContext";

import LoadingSvg from "../../assets/images/loading.svg";

function CreateModal() {
    const [displayFile, setDisplayFile] = useState(null)
    const [videoUrl, setVideoUrl] = useState('')
    const [renderVideo, setRenderVideo] = useState(false)
    const [formItem, setFormItem] = useState(null)
    const [error, setError] = useState('')
    const { videoPlaying, togglePlayer, loadingPlayer } = useContext(YoutubePlayerContext)
    const cloudName = import.meta.env.VITE_CLOUD_NAME
    const postForm = useRef(null)

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


    const selectvideo = (e) => {
        e.preventDefault()


        const url = postForm.current.url.value
        const cleanUrl = url.split('v=')[1]
        if (cleanUrl === videoUrl) { return alert('Url Identica') }
        togglePlayer('')
        setVideoUrl(cleanUrl)
        console.log(cleanUrl)

    }


    const uploadImage = async () => {
        if (!displayFile) { return setError('Nenhuma Imagem Selecionada') }

        try {
            const request = await FetchApi("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formItem)
            console.log(request)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="fixed h-svh w-full flex flex-col items-center z-30" style={{ backgroundColor: "rgba(0, 0, 0, 0.355)" }}>
            <div className="bg-white flex flex-col justify-center items-center  w-full" style={{ minHeight: '50%', maxHeight: 'fit-content' }}>
                <form ref={postForm} onSubmit={(e) => selectvideo(e)} className="flex flex-col justify-center items-center gap-3">
                    <label htmlFor="titulo">Título</label>
                    <input type="text" id="titulo" name="titulo" placeholder="escreva algo legal!" className=" p-1 boder-2 bg-slate-200 border-black rounded" />

                    <label htmlFor="url">Vídeo</label>
                    <input type="text" id="url" name="url" className=" p-1 boder-2 bg-slate-200 border-black rounded" placeholder="link do vídeo" />

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
                                {videoPlaying === 'playing' ? <FaPause onClick={() => togglePlayer('paused')} className="fixed cursor-pointer" /> : null}
                                {videoPlaying === 'paused' ? <FaPlay onClick={() => togglePlayer('playing')} className="fixed cursor-pointer" /> : null}
                                {displayFile ? <img src={displayFile} className="h-full w-full border-2 border-black" /> : null}
                            </div>

                        </>


                    </div>
                    <input type="file" accept="image/*" onChange={(e) => { selectImage(e.target.files) }} />
                    <button className="p-1 bg-slate-300 border-1 border-black m-1" type="submit">Enviar</button>
                </form>

            </div>
        </div>

    )
}

export default CreateModal