import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import getHeaderToken from "../../utils/getHeaderToken";
import { ThreeDots } from "react-loader-spinner";

const config = getHeaderToken();

export default function UploadPhotos() {
  const [pic, setPic] = useState();
  const [allPics, setAllPics] = useState([]);
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  useEffect(() => {
    getAllPics();
  }, [allPics.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", pic);

    try{
        setLoadingPhoto(true);
        const uploadedPhoto = await axios.post("http://localhost:5000/uploadPhoto", formData, config);
        await getAllPics();
        setLoadingPhoto(false);
    }catch(error){
        alert("Não foi possível fazer o upload dessa foto, tente outra!");
    }

    // await axios
    //   .post("http://localhost:5000/uploadPhoto", formData, config)
    //   .then(getAllPics())
    //   .catch((error) => console.log(error.message));
  };
  const handleChange = (e) => {
    setPic(e.target.files[0]);
  };

  const getAllPics = async () => {
    const allPicsData = await axios.get("http://localhost:5000/getProfilePhotos", config);
    console.log(allPicsData.data);

    if(!allPicsData){
        setAllPics([]);
    }

    setAllPics(allPicsData.data);

    await axios
      .get("http://localhost:5000/getProfilePhotos", config)
      .then((res) => setAllPics(res.data))
      .catch((error) => console.log(error.message));
  };

  const handleDelete = async (name) => {
    await axios
      .delete("http://localhost:5000/delete", {
        data: { name: name },
      })
      .then(getAllPics())
      .catch((error) => console.log(error.message));
  };

  return (
    <UploadPhotosContainer className="app">
      <form className="form" onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button>{loadingPhoto === false ? "upload" : <ThreeDots color="white" />}</button>
      </form>
      <div className="imgsContainer">
        {allPics?.length > 0 ? 
                    allPics &&
                        allPics.map((photo) => (
                          <div className="imgItem" key={photo.id}>
                            <img className="img" src={photo.photoUrl} alt="" />
                            <button
                              className="imgButton"
                              onClick={() => handleDelete(photo.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )) 
        :
        <div>Not pics to show</div>
        }
      </div>
    </UploadPhotosContainer>
  );
}

const UploadPhotosContainer = styled.div`
    .app {
  margin: 20px 0;
}

.form {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}

.form > button {
  border-radius: 10px;
  background-color: purple;
  border: none;
  color: white;
  width: 60px;
  font-size: 0.8rem;
}

.imgsContainer {
  margin: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.imgItem {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  align-items: center;
}

.img {
  height: 300px;
  width: 400px;
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