import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ModalsContext } from '../../context/ModalsContext';
import { FetchApi } from '../../utils/Fetch';
import LoadingPosts from '../../assets/images/loading.svg';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import GenericProfilePic from "../../assets/images/Generic-Profile-Image.png"
import PostModal from '../../components/PostModal';
import { useAuth } from '../../context/AuthContext';

function OtherProfile() {
    const { viewPostModal, toggleViewPostModal, selectPostData, myPosts, setMyPosts } = useContext(ModalsContext);
    const [atualProfilePic, setAtualProfilePic] = useState('generic');
    const [requestLoading, setRequestLoading] = useState(false);
    const [myInfo, setMyInfo] = useState(null);
    const navigate = useNavigate()
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const apiUrl = import.meta.env.VITE_API_URL;
    const { authUser } = useAuth()

 

    const cld = new Cloudinary({
        cloud: {
            cloudName: cloudName
        }
    });

    const { name } = useParams();

    const getImages = async () => {
        console.log(authUser)
        setRequestLoading(true);
        try {
            const request = await FetchApi('GET', `${apiUrl}/post/showUser-post/${name}`, '');
            setMyPosts(request.results);
        } catch (error) {
            console.log(error);
        } finally {
            setRequestLoading(false);
        }
    };

    const getProfileInfo = async () => {
        console.log(authUser)
        setRequestLoading(true);
        try {
            const request = await FetchApi('GET', `${apiUrl}/user/show-by/${name}`, '');
            setMyInfo(request.results);
            if (request.results && request.results.profilePic) {
                const item = request.results.profilePic;
                setAtualProfilePic(item.publicId);
            } else {
                setAtualProfilePic('generic');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setRequestLoading(false);
        }
    };

    const handleViewPostModal = (authorId, authorName, title, music, image) => {
        toggleViewPostModal();
        selectPostData(authorId, authorName, title, music, image);
    };

    useEffect(() => {
      
        
            
                getImages();
                getProfileInfo();
            

       
      

        return () => {
            setMyPosts([]);
        };
    }, []);

    return (
        <>
            {viewPostModal && <PostModal />}
            <div className="min-h-svh w-full bg-mainBg relative">
                <div className="w-full flex flex-col justify-center drop-shadow-lg bg-cover md:bg-center md:items-center relative" style={{ height: '50svh' }}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="w-full flex flex-col justify-center items-center text-center text-white z-30 mt-10">
                        {atualProfilePic !== 'generic' ? (
                            <AdvancedImage
                                cldImg={cld.image(`${atualProfilePic}`).resize(auto().gravity(autoGravity()).width(300).height(300))}
                                className={`size-24 rounded-full border-2 border-black cursor-pointer`}
                            />
                        ) : (
                            <img
                                src={GenericProfilePic}
                                alt="Foto de Perfil"
                                className={`size-24 rounded-full border-2 border-black cursor-pointer`}
                            />
                        )}
                        <p className="text-lg font-bold p-1">{myInfo ? myInfo.name : null}</p>
                        <div className="flex items-center justify-center">
                            <div className="flex flex-col items-center">
                                <p className="w-60 pt-5">{myInfo ? myInfo.description : null}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <h1 className="text-black font-bold text-center text-2xl py-7">Posts</h1>
                    <div className="w-full flex flex-row flex-wrap justify-center gap-5 p-5 md:z-30">
                        {requestLoading ? <img src={LoadingPosts} alt="loading" className="size-10" /> : null}
                        {myPosts ? (
                            myPosts.map((images, idx) => (
                                <AdvancedImage
                                    key={idx}
                                    cldImg={cld.image(`${images.image_public_id}`).resize(auto().gravity(autoGravity()).width(300).height(300))}
                                    className="size-32 cursor-pointer"
                                    style={{ border: '10px white solid' }}
                                    onClick={() => {
                                        handleViewPostModal(images.user_name, images.post_title, images.post_youtube_url, images.image_public_id);
                                    }}
                                />
                            ))
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
}

export default OtherProfile;
