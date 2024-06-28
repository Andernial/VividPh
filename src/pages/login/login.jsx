import { useRef, useState } from "react"
import { Link } from "react-router-dom"

function Login() {
    const [showPassword, setShowPassword] = useState(true)
    const [ requestLoading, setRequestLoading] = useState(false)

    const loginForm = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = loginForm.current.email.value
        const password = loginForm.current.password.value
        const userInfo = { email, password }
        console.log(userInfo)

    }
    return (
        <div className="h-svh w-full bg-mainBg relative flex flex-col justify-center items-center">
            <h1 className="text-3xl text-center p-2">Faça login para acessar sua conta!</h1>
              <form ref={loginForm} onSubmit={handleSubmit} className="bg-white flex flex-col justify-center items-center p-5 rounded">
             
                <div className="flex flex-col">
                    <label>Email</label>
                
                    <input type="text" name="email" className="bg-slate-300 p-1" />
                </div>

                <div className="flex flex-col">
                    <label>Senha</label>
                   
                    <input type={showPassword ? 'text': 'password'} name="password"  className="bg-slate-300 p-1"/>
                    {/* <div className='show-password'>
                        <img src={eye} alt="mostra" onClick={handleTogglePassword} className='toggle-password'/>
                        <p>mostra senha</p>

                    </div> */}

                </div>

                <div className="p-5">
                    <input type="submit" value='login' className="bg-slate-300 p-2"  />
                </div>

            </form>
            <p>Ainda não tem login ? <Link to="/Cadastro" className="">Cadastre-se Já</Link></p>
        </div>
    )
}




export default Login