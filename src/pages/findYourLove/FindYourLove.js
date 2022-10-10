import { lightColor1, lightColor2, lightColor3 } from "../../assets/globalStyles/colors";
import styled from "styled-components";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import * as service from "../../services/findYourLoveService";
import getHeaderToken from "../../utils/getHeaderToken";
import { IconClose, IconLike } from "../../components/Icon";

export default function FindYourLove(){
    const config = getHeaderToken();
    const [profiles, setProfiles] = useState([]);
    const [activeProfile, setActiveProfile] = useState(0);
    const [displayLike, setDisplayLike] = useState("initial");

    async function find10Profiles(){
        try{
            const profilesData = await service.find10Profiles(config);
            //console.log(profilesData);
            
            setProfiles(profilesData);

        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        find10Profiles();
    },[]);


    useEffect(() => {
        async function getMoreProfiles(){
            await find10Profiles();
            setActiveProfile(0);
        }


        if(profiles.length-1 === activeProfile){
            getMoreProfiles();
        }


        if(profiles.length === activeProfile){
            getMoreProfiles();
        }
        
    },[activeProfile]);


    useEffect(() => {
        if(profiles.length === 0){
            setDisplayLike("none");
        }else{
            setDisplayLike("initial");
        }
    }, [profiles.length]);


    async function closeProfile(){
        const whoReceivedDislikeId = profiles[activeProfile].id;
        //console.log(whoReceivedDislikeId);
        await service.dislike(whoReceivedDislikeId, config);

        setActiveProfile(activeProfile+1);
        //console.log(activeProfile);
    }

    async function likeProfile(){
        
        const whoReceivedLikeId = profiles[activeProfile].id;
        //console.log(whoReceivedLikeId);
        const likeResponse = await service.like(whoReceivedLikeId, config);

        if(likeResponse.match === true){
            alert("Opa, você acabou de dar um match, não perca tempo e mande uma mensagem agora!");
        }

        setActiveProfile(activeProfile+1);
    }



    return(
        <>
            <FindYourLoveScreen>
                <CloseProfile display={displayLike} onClick={() => closeProfile()}><IconClose/></CloseProfile>
                <LikeProfile display={displayLike} onClick={() => likeProfile()}><IconLike/></LikeProfile>
                {profiles.length === 0 ? <h1>Poxa, parece que não tem mais ninguem perto de você :(
                    <p>Tente daqui um tempinho de novo!</p>
                </h1>
                :
                profiles.map((profile, index) => 
                    <ProfileContainer key={profile.id} display={activeProfile === index ? "flex" : "none"}>
                        <ProfileName><h1>{profile.name}</h1></ProfileName> 
                        <PhotosContainer>
                            <MainProfilePhoto src={profiles[activeProfile]?.photos[0]?.photoUrl} alt={profiles[0].photos[0]?.id} />
                        </PhotosContainer>
                        <ProfileDescr>&nbsp;</ProfileDescr>
                            <PhotosContainer>
                                {
                                    profiles[activeProfile]?.photos?.length > 1 ? 
                                    profiles[activeProfile]?.photos.map((photo, index) => 
                                       <ProfilePhoto src={photo.photoUrl} alt={photo.id} key={photo.id}/>)
                                       :
                                    <></>
                                }

                            </PhotosContainer>
                    </ProfileContainer>
                )
                }
            </FindYourLoveScreen>
           
            <Footer/>
        </>
    );
}

const CloseProfile = styled.div`
    position: fixed;
    left: 0;
    margin-top: 80.5vh;
    margin-left: 20vw;
    display: ${props => props.display}
`

const LikeProfile = styled.div`
    position: fixed;
    right: 0;
    margin-top: 80.5vh;
    margin-right: 20vw;
    display: ${props => props.display};
`


const FindYourLoveScreen = styled.div`
    height: 90vh;
    width: 100%;
    padding: 0 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: ${lightColor1};
    opacity: 0.95;

    font-size: large;
    font-family: 'Quicksand';
    font-weight: 700;

    h1{
        padding: 10px 10px;
        font-size: 24px;
        font-family: 'Quicksand';
        font-weight: 700;
    }

    p{
        margin-top: 10px;
        font-size: 20px;
        font-family: 'Quicksand';
        font-weight: 400;
    }


`

const ProfileContainer = styled.div`
    height: 100%;
    width: 100%;
    
    display: ${props => props.display};
    flex-direction: column;
    align-items: center;
`

const PhotosContainer = styled.div`
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const MainProfilePhoto = styled.img`
        width: 99vw;
        height: 80vh;
        border: 1px solid white;
        object-fit: cover;
`

const ProfilePhoto = styled.img`
        width: 99vw;
        height: 80vh;
        border: 1px solid white;
        object-fit: cover;
`

const ProfileName = styled.div`
    padding: 10px 10px;
    position: absolute;
    left: 0;
    margin-top: 70vh;
    margin-left: 10vw;

    h1{
        color: white;
        font-size: 30px;
        font-family: 'Quicksand';
        font-weight: 700;
    }
`

const ProfileDescr = styled.div`
    width: 100%;
    min-height: 10vh;
    background-color: ${lightColor1};
`