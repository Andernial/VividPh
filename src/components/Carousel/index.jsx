
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


function Carousel({ children: imagesData, autoSlide = false, autoSlideInterval = 3000 }) {
    const [curr, setCurr] = useState(0)

    const prev = () => setCurr((curr) => (curr === 0 ? imagesData.length - 1 : curr - 1))
    const next = () => setCurr((curr) => (curr === imagesData.length - 1 ? 0 : curr + 1))

    useEffect(()=>{
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [curr, autoSlide, autoSlideInterval])

    return (
        <div className="overflow-hidden w-64 relative  border-white">
            <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${curr * 100}%)` }}>{imagesData}</div>

            <div className="absolute inset-0 flex items-center justify-between">
                <button onClick={prev} className="p-1 rounded-full shadow bg-white bg-opacity-80 text-gray-800 hover:bg-white">
                    <FaArrowLeft />
                </button>
                <button onClick={next} className="p-1 rounded-full shadow bg-white bg-opacity-80 text-gray-800 hover:bg-white">
                    <FaArrowRight />
                </button>
            </div>

            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {imagesData.map((_, i) => (
                        <div
                            key={i}
                            className={`transition-all w-3 h-3 bg-white rounded-full ${curr === i ? "p-2" : "bg-opacity-50"}`}
                        />
                    ))}
                </div>
            </div>


        </div>
    )
}

export default Carousel