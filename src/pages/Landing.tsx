import { useContext, useState } from "react";
import { Signin } from "../components/Signin";
import { Signup } from "../components/Signup";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { getApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { useApp } from "../App";

interface Props {}

export const Landing = ({}: Props) => {
  const { user, setUser } = useApp();

  const auth = getAuth(getApp());
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const provider = new GoogleAuthProvider();
  const signin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser?.(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Sign in error: ${errorMessage}`);
      });
  };
  const googlePopup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          const user = result.user;
          setUser?.(user);
          navigate("/");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(`Sign in error: ${errorMessage}`);
      });
  };
  const createUser = (email: string, password: string, username: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser?.(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Creating account error: ${errorMessage}`);
      });
  };
  return (
    <div className="w-full h-full flex justify-center items-center bg-white-10">
      {isSignup && (
        <Signup
          onClickCreate={(
            email: string,
            password: string,
            username: string
          ) => {
            createUser(email, password, username);
          }}
          onClickGoogle={() => {
            googlePopup();
          }}
          onSwitchMode={() => {
            setIsSignup(false);
          }}
        ></Signup>
      )}
      {!isSignup && (
        <Signin
          onClickLogin={(email: string, password: string) => {
            signin(email, password);
          }}
          onClickGoogle={() => {
            googlePopup();
          }}
          onSwitchMode={() => {
            setIsSignup(true);
          }}
        ></Signin>
      )}
    </div>
  );
};
