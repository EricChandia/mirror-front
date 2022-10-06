
import styled from "styled-components";
import { lightColor0, lightColor1, lightColor2, lightColor3, lightColor4 } from "../../assets/globalStyles/colors";
import { LightButton1 } from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function Home(){
    
    const navigate = useNavigate();

    return(
    <HomeScreen>
        <h1>Bem vindo ao Mirror, você ainda não possui nenhum perfil criado, vamos criar agora?</h1>
        <CreateProfileBtn onClick={() => navigate("/createProfile")} height="8%" width="40%">Criar perfil</CreateProfileBtn>
    </HomeScreen>);
}


const HomeScreen = styled.div`
    width:  100%;
    height: 100vh;
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

const CreateProfileBtn = styled(LightButton1)`
`;




