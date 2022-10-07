import { CgChevronRightO, CgChevronLeftO, CgProfile, CgHeart } from "react-icons/cg";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";


export const IconRightButton = () => {
    return (
    <IconContext.Provider value={{ color: "white", size:"40px", className: 'right-button' }}>
        <CgChevronRightO/>
    </IconContext.Provider>
    )
}

export const IconLeftButton = () => {
    return (
    <IconContext.Provider value={{ color: "white", size:"40px", className: 'left-button' }}>
        <CgChevronLeftO/>
    </IconContext.Provider>
    )
}

export const IconProfile = () => {
    return (
    <IconContext.Provider value={{ color: "white", size:"30px", className: 'icon-profile' }}>
        <CgProfile/>
    </IconContext.Provider>
    )
}

export const IconHeart = () => {
    return (
    <IconContext.Provider value={{ color: "white", size:"30px", className: 'icon-heart' }}>
        <CgHeart/>
    </IconContext.Provider>
    )
}


export const IconChat = () => {
    return (
    <IconContext.Provider value={{ color: "white", size:"30px", className: 'icon-chat' }}>
        <IoChatbubbleOutline/>
    </IconContext.Provider>
    )
}


