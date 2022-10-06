import styled from "styled-components";
import { darkColor0, lightColor0, lightColor1, lightColor2, lightColor3, lightColor4 } from "../assets/globalStyles/colors";

export const LightButton1 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: ${props => props.height || "100%"};
  width: ${props => props.width || "100%"};

  font-family: "Quicksand", sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #fff;

  border-radius: 6px;
  border: none;
  background-color: ${lightColor1};

  border: 2px solid ${lightColor2}; 

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