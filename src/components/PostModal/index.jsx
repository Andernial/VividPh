import { useContext } from "react"
import { ModalsContext } from "../../context/ModalsContext"
import { IoMdClose } from "react-icons/io";




function PostModal(){
    const {viewPostModal,toggleViewPostModal,postData} = useContext(ModalsContext)

    return(
        <div className="fixed h-svh w-full flex flex-col items-center justify-center z-30" style={{ backgroundColor: "rgba(0, 0, 0, 0.355)" }}>
               <div className="bg-transparent flex flex-col justify-center items-center font-extrabold text-white text-2xl shadow-sm  w-full">
                    <div className="flex justify-end w-full p-5">
                        <IoMdClose className="size-9 cursor-pointer" onClick={toggleViewPostModal} />
                    </div>
                        <h1 className="">{postData.music}</h1>
                        <div>
                            <img src="./src/assets/images/example.jpeg" alt="img" className="p-5" />
                        </div>
                        <div className="w-full pl-12">
                        <p className="text-start">{postData.authorId}</p>
                        <p className="text-start">music</p>
                        </div>
                       

               </div>
        </div>
    )
}

export default PostModal