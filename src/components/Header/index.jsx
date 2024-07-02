import { useContext } from "react"
import { IoMdMenu } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import { ModalsContext } from "../../context/ModalsContext"
import { useAuth } from "../../context/AuthContext"


function Header() {
  const { navOpen, toggleNav } = useContext(ModalsContext)
  const { authUser, isLoggedIn, setAuthUser, setIsLoggedin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () =>{
    setIsLoggedin(false)
    setAuthUser(null)
    navigate("/")
    toggleNav()
  }

  return (
    <div className={`fixed w-full z-30 text-white transition-colors duration-700 ease-in-out md:bg-transparent md:h-0 ${navOpen ? 'h-screen bg-slate-600' : 'bg-transparent'}`}>
      <div className="p-5 flex flex-col w-full h-full md:flex-row md:justify-around ">
        <div className="flex justify-between md:block md:h-0">
          <h1 className="text-4xl hover:cursor-pointer">
            <Link to="/" onClick={() => { if (navOpen) toggleNav(); }}>VividPh</Link>
          </h1>
          <button
            onClick={toggleNav}
            className={`transition-colors ease-in-out duration-700 rounded-lg md:hidden ${navOpen ? 'bg-white text-black' : 'text-white bg-transparent'}`}
          >
            <IoMdMenu className="text-3xl" />
          </button>
        </div>
        <nav className={`flex items-center justify-center md:block transition-all duration-700 ease-in-out md:visible md:opacity-100 md:h-0' ${navOpen ? 'h-screen opacity-100' : 'h-0 opacity-0 invisible'}`}>
          <ul className={`flex flex-col pt-8 gap-5 text-2xl md:opacity-100 md:h-auto md:flex-row md:items-center text-center md:justify-center md:p-0 md:visible ${navOpen ? 'pt-0' : null}`}>

            {isLoggedIn ? (
              <>
                <li className="transition duration-500 ease-in-out hover:scale-105 hover:text-hoverColor cursor-pointer">
                <Link to="/Profile" onClick={toggleNav}>Perfil</Link>
                </li>
                <li className="transition duration-500 ease-in-out hover:scale-105 hover:text-hoverColor cursor-pointer">
                  <Link to="/Feed" onClick={toggleNav}>Feed</Link>
                </li>
                <li className="transition duration-500 ease-in-out hover:scale-105 hover:text-hoverColor cursor-pointer">
                <button onClick={()=>handleLogout()}>Logout</button>
               </li>
              </>
            ) : (
              <>
                <li className="transition duration-500 ease-in-out hover:scale-105 hover:text-hoverColor cursor-pointer">
                  <Link to="/Login" onClick={toggleNav}>Login</Link>
                </li>
                <li className="transition duration-500 ease-in-out hover:scale-105 hover:text-hoverColor cursor-pointer">
                  <Link to="/Cadastro" onClick={toggleNav}>Cadastro</Link>
                </li>
              </>
            )}

          </ul>
        </nav>
      </div>
    </div >
  )
}


export default Header