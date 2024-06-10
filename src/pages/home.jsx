import PhotoBackGround from "../assets/images/background-sky.jpeg"

function Home() {
    return (
        <div className="h-screen w-full bg-mainBg relative">
        <div
          className="h-3/6 w-full flex flex-col justify-center drop-shadow-lg md:bg-cover md:bg-center md:items-center relative"
          style={{ backgroundImage: `url(${PhotoBackGround})` }}
        >
          {/* Overlay para escurecer a imagem de fundo */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
  
          {/* Conteúdo sobre a imagem */}
          <div className="flex flex-col gap-5 text-white pl-5 pt-7 z-20 md:pl-0">
            <h1 className="text-xl md:text-5xl font-bold">Explore sua criatividade!</h1>
            <p className="w-64 md:w-auto md:text-xl">
              Navegue pelas publicações de outros membros, descubra novas músicas, e inspire-se com a criatividade da nossa comunidade.
            </p>
            <button className="bg-gray-400 text-sm rounded p-2 w-32">Junte-se a nós!</button>
          </div>
          
        </div>
        <div className="h-full">
            <h1 className="text-black font-bold text-2xl p-7">
                Fotos Populares
            </h1>
        </div>
      </div>
    )
}




export default Home