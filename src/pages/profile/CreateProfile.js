import styled from "styled-components";
import { lightColor0, lightColor1, lightColor2, lightColor3, lightColor4 } from "../../assets/globalStyles/colors";
import { useNavigate } from "react-router-dom";
import { TransparentInput1 } from "../../components/Input";
import { useState } from "react";
import { IconLeftButton, IconRightButton } from "../../components/Icon";
import { LightButton1 } from "../../components/Button";
import * as service from "../../services/profileService";
import getHeaderToken from "../../utils/getHeaderToken";


export default function CreateProfile(){
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("");
    const [schooling, setSchooling] = useState("");

    async function saveProfile(){
        const config = getHeaderToken();

        const data = {
            name,
            occupation,
            schooling
        }
        
        try {
            await service.createProfile(data, config);
            navigate("/home");
        }catch(error){
            alert("Ops, ocorreu um erro, tente novamente mais tarde");
            console.log(error);
        }

    }


    return(
        <CreateProfileScreen>
            {page === 0 ? <TransparentInput1 placeholder="Seu lindo nome aqui" height="6%" width="60%" value={name} onChange={(e) => setName(e.target.value)}/> : false}
            {page === 1 ? <TransparentInput1 placeholder="Idade" type="number" height="6%" width="60%" value={age} onChange={(e) => setAge(e.target.value)}/> : false}
            {page === 2 ? <TransparentInput1 placeholder="Profissão" height="6%" width="60%" value={occupation} onChange={(e) => setOccupation(e.target.value)}/> : false}
            {page === 2 ? <TransparentInput1 placeholder="Escolaridade" height="6%" width="60%" value={schooling} onChange={(e) => setSchooling(e.target.value)}/> : false}

            {page > 2 ? false : <div onClick={() => {setPage(page+1)}}><IconRightButton /></div> }
            {page > 0 ? <div onClick={() => {setPage(page-1)}}><IconLeftButton /></div> : false}

            {page === 3 ? <SaveProfileBtn height="20%" onClick={() => saveProfile()}>Tudo certo</SaveProfileBtn> : false}
        </CreateProfileScreen>
    );
}

const CreateProfileScreen = styled.div`
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
    font-weight: 500;

    h1{
        margin-bottom: 50px;
        font-size: larger;
        font-weight: 500;
        word-wrap: break-word;
    }

    .right-button{
        margin-right: 10%;
        margin-bottom: 15%;
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .left-button{
        margin-left: 10%;
        margin-bottom: 15%;
        position: absolute;
        left: 0;
        bottom: 0;
    }

`



const SaveProfileBtn = styled(LightButton1)`
`;



