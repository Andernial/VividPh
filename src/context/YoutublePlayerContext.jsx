import { createContext, useState } from "react";


export const YoutubePlayerContext = createContext()


function YoutubePlayerContextProvider({ children }) {
    const [videoPlaying, setvideoPlaying] = useState('')
    const [loadingPlayer, setLoadingPlayer] = useState(false)

    const togglePlayer = (value) => {
        console.log('ativado ?')
        switch (value) {
            case 'playing':
                setvideoPlaying(value)
                console.log('caiu aqui',videoPlaying)
                break;

            case 'paused':
                setvideoPlaying(value)

                break;

                case '':
                setvideoPlaying(value)

                break;

            default:
                break;
        }
    }

    const toggleLoading = (value) =>{
        setLoadingPlayer(value)
        console.log(loadingPlayer)
    }

    return (
        <YoutubePlayerContext.Provider value={{ videoPlaying, togglePlayer,loadingPlayer, toggleLoading }}>{children}</YoutubePlayerContext.Provider>
    )
}

export default YoutubePlayerContextProvider