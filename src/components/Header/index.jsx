import { useContext } from "react"
import { IoMdMenu } from "react-icons/io"
import { Link } from "react-router-dom"
import { ModalsContext } from "../../context/ModalsContext"


function Header() {
    const { navOpen, toggleNav } = useContext(ModalsContext)


    return (
        <div className={`text-white fixed w-full z-40 transition-colors duration-700 ease-in-out md:bg-transparent ${navOpen ? 'h-svh bg-slate-600': 'bg-transparent'}`} >
            <div className="p-5 flex flex-col w-full h-full md:flex-row md:justify-around md:items-start ">
                <div className="flex justify-between md:block">
                    <h1 className="text-4xl hover:cursor-pointer"><Link to={"/"} onClick={()=>{navOpen ? toggleNav() : null}}>VividPh</Link></h1>
                    <button
                        onClick={toggleNav}
                        className={`transition-colors ease-in-out duration-700  rounded-lg md:hidden ${navOpen ? 'bg-white  text-black' : 'text-white bg-transparent '}`}>
                        <IoMdMenu className="size-10" />
                    </button>
                </div>
                <nav className={` flex items-center justify-center md:block  ${navOpen ? 'h-svh': 'h-full'}`}>
                    <ul className={`flex flex-col pt-8 gap-5 text-2xl transition-opacity duration-700 ease-in-out  md:opacity-100 md:h-auto md:flex-row md:items-center md:justify-center md:p-0 md:visible ${navOpen ? 'h-full opacity-1' : 'h-full opacity-0 invisible'}`}>
                        <li className="transition duration-500 ease-in-out hover:scale-105 hover:text-hoverColor cursor-pointer"> <Link to={"/Profile"} onClick={toggleNav}>Perfil</Link></li>
                        <li>Feed</li>

                    </ul>
                </nav>
            </div>
        </div>
    )
}


export default Header