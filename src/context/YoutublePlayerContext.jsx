import { createContext, useState } from "react";


export const YoutubePlayerContext = createContext()


function YoutubePlayerContextProvider({children}){
    const [videoPlaying, setvideoPlaying] = useState(false)

    const togglePlayer = () => {
        setvideoPlaying(!videoPlaying)
    }

    return(
        <YoutubePlayerContext.Provider value={{navOpen,togglePlayer}}>{children}</YoutubePlayerContext.Provider>
    )
}

export default YoutubePlayerContextProvider