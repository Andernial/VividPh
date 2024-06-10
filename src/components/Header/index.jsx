import { useContext } from "react"
import { IoMdMenu } from "react-icons/io"
import { NavContext } from "../../context/NavContext"


function Header() {
    const { navOpen, handleNav } = useContext(NavContext)

    return (
        <div className="text-white fixed w-full z-40" >
            <div className="p-5 flex flex-col w-full h-full md:flex-row md:justify-around md:items-center ">
                <div className="flex justify-between md:block">
                    <h1 className="text-4xl">VividPh</h1>
                    <button
                        onClick={handleNav}
                        className={`transition-colors ease-in-out duration-700  rounded-lg md:hidden ${navOpen ? 'bg-white  text-black' : 'text-white bg-transparent '}`}>
                        <IoMdMenu className="size-10" />
                    </button>
                </div>
                <nav className={`h-full flex items-center justify-center md:block`}>
                    <ul className={`flex flex-col pt-8 gap-5 text-2xl transition-opacity duration-700 ease-in-out md:opacity-100 md:h-auto md:flex-row md:items-center md:justify-center md:p-0 ${navOpen ? 'h-full opacity-1' : 'h-0 opacity-0'} overflow-hidden`}>
                        <li>Perfil</li>
                        <li>Feed</li>

                    </ul>
                </nav>
            </div>
        </div>
    )
}


export default Header