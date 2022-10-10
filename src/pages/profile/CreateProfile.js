import styled from "styled-components";
import { lightColor0, lightColor1, lightColor2, lightColor3, lightColor4 } from "../../assets/globalStyles/colors";
import { useNavigate } from "react-router-dom";
import { TransparentInput1, TransparentTextArea } from "../../components/Input";
import { useEffect, useState } from "react";
import { IconLeftButton, IconRightButton } from "../../components/Icon";
import { LightButton1 } from "../../components/Button";
import * as service from "../../services/profileService";
import getHeaderToken from "../../utils/getHeaderToken";
import * as profileService from "../../services/profileService";

export default function CreateProfile(){
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("");
    const [schooling, setSchooling] = useState("");
    const [description, setDescription] = useState("");
    const [gender, setGender] = useState("");
    const [identification, setIdentification] = useState("");
    const [lookingFor, setLookingFor] = useState("");
    const config = getHeaderToken();

    useEffect(() => {
        async function checkIfUserHasProfile(){
            const userProfile = await profileService.getUserProfile(config);
            if(userProfile){
                navigate("/home");
            }
        }

        checkIfUserHasProfile();
    }, [])

    async function saveProfile(){
        const config = getHeaderToken();

        const data = {
            name,
            age,
            occupation,
            schooling,
            description,
            gender,
            identification,
            lookingFor
        }
        
        try {
            await service.createProfile(data, config);
            navigate("/uploadPhotos");
        }catch(error){
            alert("Ops, ocorreu um erro, tente novamente mais tarde");
            console.log(error);
        }

    }

    function nextPage(){
        if(page === 0 && name.length < 3){
            alert("O nome é obrigatório :(");
            return;
        }

        if(page === 2 && gender.length === 0){
            alert("Essa informação é obrigatória :(");
            return;
        }

        if(page === 3 && lookingFor.length === 0){
            alert("Essa informação é obrigatória :(");
            return;
        }
        
        setPage(page+1);
    }

    function genderChoice(e){
        setGender(e.target.value);
    }

    return(
        <CreateProfileScreen>
            {page === 0 ? <TransparentInput1 placeholder="Seu lindo nome aqui" height="6%" width="60%" value={name} onChange={(e) => setName(e.target.value)}/> : false}
            {page === 1 ? <h1>Aqui nada é obrigatório ok? Sinta-se à vontade de preencher o que preferir.</h1> : false}
            {page === 1 ? <TransparentInput1 placeholder="Idade" type="number" height="6%" width="60%" value={age} onChange={(e) => setAge(e.target.value)}/> : false}
            {page === 1 ? <TransparentInput1 placeholder="Profissão" height="6%" width="60%" value={occupation} onChange={(e) => setOccupation(e.target.value)}/> : false}
            {page === 1 ? <TransparentInput1 placeholder="Escolaridade" height="6%" width="60%" value={schooling} onChange={(e) => setSchooling(e.target.value)}/> : false}
            {page === 1 ? <TransparentTextArea placeholder="Escreva uma linda descrição sobre você aqui" height="15%" width="60%" value={description} onChange={(e) => setDescription(e.target.value)}/> : false}

            {page === 2 ? 
            <>
                <h1>Escolha a opção que te descreve melhor, em seguida, você pode falar mais sobre isso.</h1> 
                <GenderChoice onChange={genderChoice}>
                <input type="radio" value="Man" name="gender" /> Homem 
                <input type="radio" value="Woman" name="gender" /> Mulher
                <input type="radio" value="Any" name="gender" /> Não binário
                </GenderChoice>
                <TransparentTextArea placeholder="Você se identifica como? Ex: Hetero, Trans, Não binário, Cis etc" fontSize="18px" height="10%" width="80%" value={identification} onChange={(e) => setIdentification(e.target.value)}/>
            </>
            : false}
            
            {page === 3 ? <h1>Você está em busca de um amor que se identifica como?</h1> : false}
            
            {page === 3 ? 
                
                <GenderChoice onChange={(e) => setLookingFor(e.target.value)}>
                    <input type="radio" value="Man" name="gender" /> Homem 
                    <input type="radio" value="Woman" name="gender" /> Mulher
                    <input type="radio" value="Any" name="gender" /> Tanto faz
                </GenderChoice>
                                
            : false}

            {page > 3 ? false : <div onClick={() => nextPage()}><IconRightButton /></div> }
            {page > 0 ? <div onClick={() => {setPage(page-1)}}><IconLeftButton /></div> : false}

            {page === 4 ? <SaveProfileBtn height="20%" onClick={() => saveProfile()}>Tudo certo</SaveProfileBtn> : false}
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




const GenderChoice = styled.div`
    margin-bottom: 10px;
    align-items: center;

`;




