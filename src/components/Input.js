import styled from "styled-components";
import { darkColor0, lightColor0, lightColor1, lightColor2, lightColor3, lightColor4 } from "../assets/globalStyles/colors";


export const TransparentInput1 = styled.input`

display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: ${props => props.height || "100%"};
  width: ${props => props.width || "100%"};
  margin-bottom: 10px;

  font-family: "Quicksand", sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  

  border-radius: 6px;
  border: none;
  background-color: ${lightColor1};

  border-bottom: 2px solid #fff; 

  ::placeholder{
    color: #fff;
  }

  svg {
    height: 1rem;
  }

  @media (max-width: 800px) {
    width: 60%;
  }

  @media (max-width: 435px) {
    width: 90%;
  }

`