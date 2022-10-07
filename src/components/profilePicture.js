import styled from "styled-components";
import { darkColor0, lightColor0, lightColor1, lightColor2, lightColor3, lightColor4 } from "../assets/globalStyles/colors";

export const CircleImg = styled.img`
    height: ${props => props.height || "100%"};
    width: ${props => props.width || "100%"};
    border-radius: 100%;
    object-fit: cover;
    border: 1px solid white;
`