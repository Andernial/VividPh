

function Carousel({children: imagesData}){
    return(
        <div className="overflow-hidden relative">
        <div className=" h-full flex justify-center items-center">{imagesData}</div>
        </div>
    )
}

export default Carousel