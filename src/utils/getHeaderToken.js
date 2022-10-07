
export default function getHeaderToken(){
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return config;
}