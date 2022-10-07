import { lightColor1, lightColor3 } from "../../assets/globalStyles/colors";
import styled from "styled-components";
import Footer from "../../components/Footer";

export default function FindYourLove(){



    return(
        <>
            <FindYourLoveScreen>

            </FindYourLoveScreen>
            <Footer/>
        </>
    );
}

const FindYourLoveScreen = styled.div`
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