
import styled from "styled-components";
import { lightColor0, lightColor1, lightColor2, lightColor3, lightColor4 } from "../../assets/globalStyles/colors";
import { LightButton1 } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import * as service from "../../services/profileService";
import { useEffect, useState } from "react";
import getHeaderToken from "../../utils/getHeaderToken";
import { CircleImg } from "../../components/profilePicture";
import Footer from "../../components/Footer";


export default function Home(){
    
    const navigate = useNavigate();
    const [profileExists, setProfileExists] = useState(false);
    const [profile, setProfile] = useState({});
    const config = getHeaderToken();
        
    useEffect(() => {
        async function checkIfProfileExists(){
            
            try{
                const profileData = await service.getUserProfile(config);
                if(!profileData){
                    setProfileExists(false);
                    return;
                }else{
                    //console.log(profile);
                    setProfileExists(true);
                    setProfile(profileData);
                }

                
            }catch(error){
                console.log(error);
            }
            
            //console.log(profileExistis);
        }
        checkIfProfileExists();
    }, []);

    return(
    <>
        <HomeScreen>
            {profileExists ? 
                <>
                    <ProfilePicture onClick={() => navigate("/uploadPhotos")} width="100px" height="100px" src={profile?.photos[0]?.photoUrl} alt="profilePicture"></ProfilePicture>
                    <>
                    <Name>{profile.name}</Name>
                    {/* <ProfileTag>@joji</ProfileTag> */}
                    </>
                    
                </>
                :
                <>
                    <div><h1>Bem vindo ao Mirror, você ainda não possui nenhum perfil criado, vamos criar agora?</h1></div>
                    <CreateProfileBtn onClick={() => navigate("/createProfile")} height="8%" width="40%">Criar perfil</CreateProfileBtn>
                </>
            }
        <BtnExit onClick={() => navigate("/")}>Sair</BtnExit>
        </HomeScreen>
        {profileExists ? <Footer /> : <BlankFooter />}
        
    </>
    );
}


const HomeScreen = styled.div`
    width:  100%;
    height: 90vh;
    padding: 20px 20px;

    position: relative;

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
        margin-bottom: 50px;
        font-size: larger;
        font-weight: 500;
        word-wrap: break-word;
    }

`
const Name = styled.p`
        font-family: "Quicksand";
        margin-bottom: 5px;
        font-size: 25px;
        font-weight: 400;
`

const ProfileTag = styled.p`
        font-family: "Quicksand";
        margin-bottom: 5px;
        font-size: 20px;
        font-weight: 400;
`

const CreateProfileBtn = styled(LightButton1)`
`;



const ProfilePicture = styled(CircleImg)`
    margin-bottom: 10px;
`;


const BtnExit = styled.div`
    position: absolute;
    bottom: 0;
    padding-bottom: 10px;

    font-family: "Quicksand";
    font-size: 15px;
    font-weight: 400;
`


const BlankFooter = styled.div`
    width: 100%;
    min-height: 10vh;

    background-color: ${lightColor1};
`