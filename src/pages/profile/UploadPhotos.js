import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import getHeaderToken from "../../utils/getHeaderToken";
import { ThreeDots } from "react-loader-spinner";
import { lightColor1 } from "../../assets/globalStyles/colors";
import { LightButton1 } from "../../components/Button";
import { IconLeftButton, IconRightButton } from "../../components/Icon";
import { useNavigate } from "react-router-dom";
import * as uploadService from "../../services/uploadService";

const config = getHeaderToken();

export default function UploadPhotos() {
  const [pic, setPic] = useState();
  const [allPics, setAllPics] = useState([]);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const navigate = useNavigate();
  const config = getHeaderToken();

  useEffect(() => {
    getAllPics();
  }, [allPics?.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", pic);

    try{
        setLoadingPhoto(true);
        //const uploadedPhoto = await axios.post("http://localhost:5000/uploadPhoto", formData, config);
        const uploadedPhoto = await uploadService.uploadPhoto(formData, config);
        await getAllPics();
        setLoadingPhoto(false);
    }catch(error){
        alert("Não foi possível fazer o upload dessa foto, tente outra!");
    }

  };
  const handleChange = (e) => {
    setPic(e.target.files[0]);
  };

  const getAllPics = async () => {
    const config = getHeaderToken();
    //const allPicsData = await axios.get("http://localhost:5000/getProfilePhotos", config);
    const allPicsData = await uploadService.getProfilePhotos(config);
    console.log(allPicsData);
    console.log(allPicsData.data);

    if(!allPicsData){
        setAllPics([]);
    }

    setAllPics(allPicsData);

  };

  const handleDelete = async (name) => {
    await axios
      .delete("http://localhost:5000/delete", {
        data: { name: name },
      })
      .then(getAllPics())
      .catch((error) => console.log(error.message));
  };

  function validatePics(){
    if(allPics.length < 1){
      alert("É necessário pelo menos uma foto para continuar :(")
      return;
    }

    navigate("/home");
  }

  return (
    <UploadPhotosContainer className="app">
      <h1>Escolha aqui as fotos mais lindas que tiver, clique em "Escolher arquivo" e após isso em "Upload" para subir as fotos, (uma de cada vez ok?)</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div><InputFile type="file" onChange={handleChange} /></div>
        <UploadButton>{loadingPhoto === false ? "upload" : <ThreeDots color="white" />}</UploadButton>
      </form>
      <div className="imgsContainer">
        {allPics?.length > 0 ? 
                    allPics &&
                        allPics.map((photo) => (
                          <div className="imgItem" key={photo.id}>
                            <img className="img" src={photo.photoUrl} alt="" />
                            {/* <button
                              className="imgButton"
                              onClick={() => handleDelete(photo.id)}
                            >
                              Delete
                            </button> */}
                          </div>
                        ))
        :
        <div>Nenhuma foto ainda</div>
        }
      </div>
        {allPics?.length > 0 ?
          <>
            <h1>Se já terminou, é só clicar abaixo e já vamos atrás do seu amor verdadeiro :)</h1>
            <BtnComplete onClick={() => validatePics()}>Vamos lá</BtnComplete> 
          </>
        :
        false  
      }
    </UploadPhotosContainer>
  );
}

const BtnComplete = styled.div`
  min-width: 100%;
  min-height: 6vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  width: 20px;
  height: 20px;
`

const UploadPhotosContainer = styled.div`

    width:  100vw;
    min-height: 100vh;
    padding: 20px 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
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

.form {
  display: flex;
  flex-direction: column;
}


.imgsContainer {
  width: 100%;
  margin: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: ${lightColor1};
}

.imgItem {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  align-items: center;
  border: 2px solid white;
}

.img {
  height: 300px;
  width: 100%;
  object-fit: cover;
}

.imgButton {
  margin-top: 5px;
  border-radius: 10px;
  background-color: purple;
  border: none;
  color: white;
  width: 60px;
  font-size: 0.8rem;
} 
`

const UploadButton = styled(LightButton1)`
  width: 100%;
  margin-top: 10px;
`

const InputFile = styled.input`
  width: 100%;
  height: 20px;

`