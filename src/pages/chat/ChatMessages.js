import { useEffect, useState } from "react";
import { Form, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { darkColor0, darkColor1, lightColor0, lightColor1, lightColor2, lightColor3, lightColor4 } from "../../assets/globalStyles/colors";
import { IconBack, IconLeftButton, IconSend } from "../../components/Icon";
import { NormalInput } from "../../components/Input";
import getHeaderToken from "../../utils/getHeaderToken";
import { useNavigate } from "react-router-dom";
import * as chatService from "../../services/chatService";

export default function ChatMessages(){
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const config = getHeaderToken();
    const [messages, setMessages] = useState([]);
    const [msgInput, setMsgInput] = useState("");
    const { matchId, matchProfileId, matchName, matchPhoto } = location.state;
    const [updateChat, setUpdateChat] = useState(0);

    useEffect(() => {
        async function getChatMessages(){  
          const chatData = await chatService.getChatMessages(matchId, config);

          //console.log(chatData);
          if(chatData){
            setMessages([...chatData]);
          }
        }
        getChatMessages();
    }, [updateChat]);

 
    async function sendMessage(){
        const body = {
            matchId, whoReceivedId: matchProfileId, message: msgInput
        }

        //console.log(body);

        await chatService.sendMessage(body, config);
        setMsgInput("");
        setUpdateChat(updateChat+1);
    }

    async function sendMessageWithEnter(e){
        //matchId, whoReceivedId, message

        if (e.key === 'Enter') {
            await sendMessage();
          }
    }



    return(
        <ChatMessagesScreen>
        <ChatHeader>
            <BtnBack onClick={() => navigate("/chat")}><IconBack/></BtnBack>
            <h1>{matchName}</h1>
        </ChatHeader>
        <MessagesContainer>
            {
                messages.map((message, index) =>
                <Message key={message._id} position={message.whoSendedId !== matchProfileId ? "flex-end" : "flex-start"}>
                    <h3>{message.time}</h3>
                    <h2>{message.message}</h2>
                </Message> 
                )
            }
        </MessagesContainer>
        <ChatMessageFooter>
            <MessageInput autoFocus={true} value={msgInput} placeholder="Habla aquí :)" onChange={(e)=> {setMsgInput(e.target.value)}} onKeyDown={(e) => sendMessageWithEnter(e)}/>
            <BtnSend onClick={() => sendMessage()}><IconSend/></BtnSend>
        </ChatMessageFooter>
        </ChatMessagesScreen>
    );
}

const ChatMessagesScreen = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 10px 10px;
    background-color: ${lightColor1};
    opacity: 0.95;
`

const ChatHeader = styled.div`
    width: 100%;
    height: 8vh;
    display: flex;
    align-items: center;

    h1{
        font-size: 32px;
        font-family: 'Quicksand';
        font-weight: 700;
        color: ${darkColor0};
    }
    
`

const MessagesContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 6vh;

    background-color: ${lightColor1};
`

const Message = styled.div`
    width: 80%;
    min-height: 4vh;
    margin-bottom: 5px;
    padding: 4px 4px;

    border-radius: 10px;
    display: flex;
    align-items: center;

    align-self: ${props => props.position};
    

    background: rgba(255, 255, 255, .8);

    h2{
        margin-left: 5px;
        word-wrap: break-word;
        color: ${darkColor0};
    }

    h3{
        color: gray;
        font-size: 10px;
    }
`

const ChatMessageFooter = styled.div`
    width: 100vw;
    height: 6vh;
    background-color: ${lightColor1};
    padding: 5px 10px;

    display: flex;
    align-items: center;

    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;

    form{
        display: flex;
        width: 100%;
    }
`

const MessageInput = styled(NormalInput)`
    width: 85%;
    height: 5vh;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid white;
    background-color: ${lightColor1};

    font-family: "Quicksand", sans-serif;
    font-size: 20px;
    font-weight: 500;
    color: ${darkColor0};

    ::placeholder{
    color: ${darkColor0};
  }
`

const BtnSend = styled.div`
    width: 15%;

    display: flex;
    align-items: center;
    justify-content: center;
`

const BtnBack = styled.div`
    width: 10%;
    
    display: flex;
    align-items: center;
    justify-content: center;
`