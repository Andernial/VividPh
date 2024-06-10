import ProfilePic from "../../assets/images/example.jpeg"

function Profile() {

    const myProfile = false

    return (
        <div className=" min-h-svh w-full bg-mainBg relative">
            <div
                className=" w-full flex flex-col justify-center drop-shadow-lg bg-cover md:bg-center md:items-center relative"
                style={{ height: '50svh' }}
            >
                {/* Overlay para escurecer a imagem de fundo */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Conteúdo sobre a imagem */}
                <div className="w-full flex flex-col justify-center items-center text-center text-white z-30 mt-10">
                    <img src={ProfilePic} alt="Foto de Perfil" className={`size-24 rounded-full border-2 border-black`} />
                    <p className="text-lg font-bold p-1">Sabbat</p>
                    <p className=" w-60 pt-5">Olá eu gosto de tirar muitas fotos e esse é meu perfil !</p>
                </div>

            </div>
            <div className="w-full">
                <h1 className="text-black font-bold text-center text-2xl py-7">
                    {myProfile ? "Minhas fotos" : "Fotos Populares"}
                </h1>

            </div>
            {myProfile ? (
                <div className="fixed w-full flex flex-col justify-end items-end top-3/4">
                    <button className=" mr-5 size-16 rounded-full bg-white">add</button>
                </div>
            ) : null}


        </div>

    )
}




export default Profile