import styled from "styled-components";
import { darkColor0, lightColor0, lightColor1, lightColor2, lightColor3, lightColor4 } from "../assets/globalStyles/colors";
import { IconChat, IconHeart, IconProfile } from "./Icon";
import { useNavigate } from "react-router-dom";

export default function Footer(){
    const navigate = useNavigate();


    return(
        <FooterContainer>
            <div onClick={() => navigate("/home")}><IconProfile /></div>
            <div onClick={() => navigate("/love")}><IconHeart /></div>
            <div onClick={() => navigate("/chat")}><IconChat /></div>
        </FooterContainer>
    );
}

const FooterContainer = styled.div`
    width: 100vw;
    height: 10vh;
    padding: 0 10%;
    z-index: 99;
    position: fixed;
    bottom: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${lightColor1}
`