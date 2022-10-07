
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
                const profile = await service.getUserProfile(config);

                if(!profile){
                    setProfileExists(false);
                    return;
                }else{
                    //console.log(profile);
                    setProfileExists(true);
                    setProfile(profile);
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
                    <ProfilePicture width="100px" height="100px" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="profilePicture"></ProfilePicture>
                    <>
                    <Name>{profile.name}</Name>
                    <ProfileTag>@joji</ProfileTag>
                    </>
                    
                </>
                :
                <>
                    <div><h1>Bem vindo ao Mirror, você ainda não possui nenhum perfil criado, vamos criar agora?</h1></div>
                    <CreateProfileBtn onClick={() => navigate("/createProfile")} height="8%" width="40%">Criar perfil</CreateProfileBtn>
                </>
            }

        </HomeScreen>
        <Footer />
    </>
    );
}


const HomeScreen = styled.div`
    width:  100%;
    height: 90vh;
    padding: 20px 20px;

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






