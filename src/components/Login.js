import { Button } from "@material-ui/core";
import React from "react";
import { setUser } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { auth, provider } from "../firebase/firebase.config";
import "../styles/Login.css";

const Login = () => {
  console.log("global state >>>", useStateValue());

  const [{ user }, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
          // dispatch to usereducer an action
        dispatch({ ...setUser(), user: res.user });
      })
      .catch((err) => alert(err));
  };
  return (
    <div className="login">
      <div className="login__container">

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f7/WhatsApp_logo.svg"
          alt="whatsapp logo"
        />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
