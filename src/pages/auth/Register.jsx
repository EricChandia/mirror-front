import {
    AuthScreen,
    AuthLogo,
    InfosLogo,
    AuthInputs,
    Form,
    Input,
    InvalidForm,
    AuthButton,
    GoTo,
  } from "../../components/authComponents";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { ThreeDots } from "react-loader-spinner";
  import * as service from "../../services/authService";
  
  export default function Register() {
    const navigate = useNavigate();
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picture, setPicture] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPicture, setInvalidPicture] = useState(false);
    const [loader, setLoader] = useState("Sign Up");
  
    const [disable, setDisable] = useState(false);
  
    const signUp = async (e) => {
      e.preventDefault();
  
      const body = {
        email,
        password,
        confirmPassword
      };
  
      try {
        if(confirmPassword != password){
          alert("Senha e confirmar senha não conferem")
          return;
        }
        //const promise = await axios.post(" http://localhost:5000/signup", body);
        const data = await service.signup(body);
        //console.log(data);
        setDisable(true);
        setLoader(<ThreeDots color="white" />);
        navigate("/");
      } catch (error) {
        if (error.response.status === 409) {
          setLoader(<ThreeDots color="white" />);
          setInvalidEmail(true);
          setInvalidPicture(false);
          setDisable(true);
          setTimeout(() => setDisable(false), 500);
          setTimeout(() => setLoader("Sign Up"), 500);
        }
        if (error.response.status === 422) {
          alert("A senha deve conter pelo menos 6 caracteres!");
          setLoader(<ThreeDots color="white" />);
          setInvalidEmail(true);
          setInvalidPicture(false);
          setDisable(true);
          setTimeout(() => setDisable(false), 500);
          setTimeout(() => setLoader("Sign Up"), 500);
        }
  
        console.log(error.response);
      }
    };
  
    return (
      <AuthScreen>
        <AuthLogo>
          <InfosLogo>
            <h1>Mirror</h1>
            <h2>Encontre o reflexo da sua personalidade</h2>
          </InfosLogo>
        </AuthLogo>
        <AuthInputs>
          <Form onSubmit={signUp}>
            {invalidEmail && (
              <InvalidForm>⛔ Use um e-mail válido para continuar!</InvalidForm>
            )}
  
            <Input
              disabled={disable}
              type="email"
              placeholder="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              disabled={disable}
              type="password"
              placeholder="senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <Input
              disabled={disable}
              type="password"
              placeholder="confirmar senha"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
            />
            <AuthButton disabled={disable} type="submit">
              {loader}
            </AuthButton>
            <GoTo onClick={() => navigate("/")}>Voltar para o login</GoTo>
          </Form>
        </AuthInputs>
      </AuthScreen>
    );
  }
  