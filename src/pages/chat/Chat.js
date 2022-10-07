import { lightColor1 } from "../../assets/globalStyles/colors";
import Footer from "../../components/Footer";
import styled from "styled-components";


export default function Chat(){



    return(
        <>
            <ChatScreen>

            </ChatScreen>
            <Footer/>
        </>
    );
}

const ChatScreen = styled.div`
    height: 90vh;
    width: 100;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: ${lightColor1};
    opacity: 0.95;

    font-size: large;
    font-family: 'Quicksand';
    font-weight: 700;
`