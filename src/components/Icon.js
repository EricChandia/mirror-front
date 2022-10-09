import { CgChevronRightO, CgChevronLeftO, CgProfile, CgHeart, CgCloseO, CgCheckO, CgChevronLeft, CgChevronRight} from "react-icons/cg";
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


export const IconClose = () => {
    return (
    <IconContext.Provider value={{ color: "red", size:"50px", className: 'icon-close' }}>
        <CgCloseO/>
    </IconContext.Provider>
    )
}



export const IconLike = () => {
    return (
    <IconContext.Provider value={{ color: "green", size:"50px", className: 'icon-like' }}>
        <CgCheckO/>
    </IconContext.Provider>
    )
}



