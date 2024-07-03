import { useNavigate } from "react-router-dom"
import PhotoBackGround from "../../assets/images/background-sky.jpeg"
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import Carousel from "../../components/Carousel"
import { useEffect, useState } from "react";
import { FetchApi } from "../../utils/Fetch";
import { useAuth } from "../../context/AuthContext";
import LoadingPosts from "../../assets/images/loading.svg"

function Home() {

  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [imagesData, setImagesData] = useState([])
  const [requestLoading, setRequestLoading] = useState(false)
  const cloudName = import.meta.env.VITE_CLOUD_NAME
  const apiUrl = import.meta.env.VITE_API_URL

  const sendLogin = () => {
    if (isLoggedIn) {
      return navigate('/Profile')
    }
    navigate('/Login')
  }

  const cld = new Cloudinary({ // setando imagens com o cloudnary
    cloud: {
      cloudName: cloudName
    }
  })

  const getImages = async () => {
    setRequestLoading(true)

    try {
      const request = await FetchApi("GET", `${apiUrl}/post/show-all`, '')
      setImagesData(request.results)
      console.log(request)
    } catch (error) {
      console.log(error)
    } finally {
      setRequestLoading(false)
    }
  }

  useEffect(() => {
    getImages()
  }, [])

  return (
    <div className="min-h-svh w-full bg-mainBg relative">
      <div
        className=" w-full flex flex-col justify-center drop-shadow-lg bg-cover md:bg-center md:items-center relative"
        style={{ backgroundImage: `url(${PhotoBackGround})`, height: '50svh' }}
      >
        {/* Overlay para escurecer a imagem de fundo */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Conteúdo sobre a imagem */}
        <div className="flex flex-col gap-5 text-white pl-5 pt-7 z-30 md:pl-0">
          <h1 className="text-xl md:text-5xl font-bold">Explore sua criatividade!</h1>
          <p className="w-64 md:w-auto md:text-xl">
            Navegue pelas publicações de outros membros, descubra novas músicas, e inspire-se com a criatividade da nossa comunidade.
          </p>
          <button className="bg-gray-400 transition duration-700 ease-in-out text-sm rounded p-2 w-32 hover:bg-gray-700 hover:scale-110 md:p-3 md:text-lg md:w-52" onClick={() => sendLogin()}>Junte-se a nós!</button>
        </div>

      </div>
      <div className="">
        <h1 className="text-black font-bold text-2xl p-7">
          Fotos Populares
        </h1>
        <div className="w-full flex justify-center items-center">
          {requestLoading ?
              <img src={LoadingPosts} alt="loading" className="size-64" />
            : null}


          {imagesData ? (
            <Carousel autoSlide={true}>
              {imagesData.map((image, idx) => (
                <AdvancedImage
                  key={idx}
                  cldImg={cld.image(`${image.image_public_id}`).resize(auto().gravity(autoGravity()).width(300))}
                />
              ))}
            </Carousel>
          ) : null}

        </div>


      </div>
    </div>
  )
}




export default Home