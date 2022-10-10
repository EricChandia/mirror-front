import { darkColor0, lightColor0, lightColor1 } from "../../assets/globalStyles/colors";
import Footer from "../../components/Footer";
import styled from "styled-components";
import { useEffect, useState } from "react";
import getHeaderToken from "../../utils/getHeaderToken";
import * as chatService from "../../services/chatService";
import { CircleImg } from "../../components/profilePicture";
import { useNavigate } from "react-router-dom";

export default function Chat(){

    const config = getHeaderToken();
    const navigate = useNavigate();
    const [profileMatchs, setProfileMatchs] = useState([]);

    useEffect(() => {

        async function getAllProfileMatchs(){
            const profileMatchsData = await chatService.getAllProfileMatchs(config);

            console.log(profileMatchsData);
            setProfileMatchs([...profileMatchsData]);
        }

        getAllProfileMatchs();

    }, []);


    function openChatWithMatch(index){
        const selectedChatProfile = profileMatchs[index];
        console.log(selectedChatProfile.matchId);

        navigate(`/chat/${selectedChatProfile.matchId}`, {state:
            {
                matchId: selectedChatProfile.matchId, 
                matchProfileId: selectedChatProfile.profile.id,
                matchName: selectedChatProfile.profile.name, 
                matchPhoto: selectedChatProfile.profile.photos[0]
            }
        });
    }

    return(
        <>
            <ChatScreen>
                <h1>User's Matchs</h1>
                <h2>Conversas</h2>
                <ChatsList>
                    {profileMatchs.map((match, index) => 
                        <ChatContainer onClick={() => openChatWithMatch(index)} key={match.matchId}>
                            <CircleImg height="45px" width="45px" src={match.profile.photos[0].photoUrl} alt={match.profile.photos[0].id}></CircleImg>
                            <h3><b>{match.profile.name}</b></h3>
                        </ChatContainer>
                    )}
                </ChatsList>
            </ChatScreen>
            <Footer/>
        </>
    );
}

const ChatScreen = styled.div`
    height: 90vh;
    width: 100;
    padding: 10px 10px;

    display: flex;
    flex-direction: column;


    background-color: ${lightColor1};
    opacity: 0.95;

    h1{
        font-size: 32px;
        font-family: 'Quicksand';
        font-weight: 700;
    }

    h2{
        margin-top: 10vh;
        font-size: 20px;
        font-family: 'Quicksand';
        font-weight: 500;
        color: ${darkColor0}
    }
`

const ChatsList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
const ChatContainer = styled.div`
    width: 100%;
    height: 10vh;
    padding: 10px 10px;

    display: flex;
    align-items: center;

    h3{
        margin-left: 10px;
        font-size: large;
        font-family: 'Quicksand';
        font-weight: 500;
    }
`