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
  
  import { useState, useContext } from "react";
  import { useNavigate } from "react-router-dom";
  import { ThreeDots } from "react-loader-spinner";
  import UserContext from "../../contexts/UserContext";
  import axios from "axios";
  import * as service from "../../services/authService";

  export default function Login() {
    const navigate = useNavigate();
    const { setToken } = useContext(UserContext);
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState("Sign In");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [disable, setDisable] = useState(false);
  
    const signIn = async (e) => {
      e.preventDefault();
  
      const body = {
        email,
        password,
      };
  
      try {
        //const promise = await axios.post("http://localhost:5000/signin", body);
        const data = await service.signin(body);
        //console.log(data);
        setToken(data.token);
        localStorage.setItem("token", data.token);
  
        setDisable(true);
        setLoader(<ThreeDots color="white" />);
        navigate("/home");
      } catch (error) {
        console.log(error.response.status);
        setLoader(<ThreeDots color="white" />);
        setDisable(true);
        setTimeout(() => setDisable(false), 500);
        setTimeout(() => setLoader("Sign In"), 500);
  
        if (error.response.status) {
          setInvalidEmail(true);
        }
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
          <Form onSubmit={signIn}>
            {invalidEmail && (
              <InvalidForm>Email ou senha incorretos</InvalidForm>
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
            <AuthButton disabled={disable} type="submit">
              {loader}
            </AuthButton>
            <GoTo onClick={() => navigate("/signup")}>
              Primeira vez? Crie uma conta!
            </GoTo>
          </Form>
        </AuthInputs>
      </AuthScreen>
    );
  }
  