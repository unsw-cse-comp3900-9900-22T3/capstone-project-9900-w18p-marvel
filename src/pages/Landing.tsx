import { useContext, useState } from "react";
import { Signin } from "../components/Signin";
import { Signup } from "../components/Signup";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { useApp } from "../App";
import { delay } from "../utils/promise";
import { createUser, getUser } from "../api/user";
import { faker } from "@faker-js/faker";
import { User } from "../api/type";

interface Props {}

export const Landing = ({}: Props) => {
  const { user, setUser, setAuthorized,snackbarOpen,
    setSnackbarOpen,
    snackbarText,
    setSnackbarText, } = useApp();

  const auth = getAuth(getApp());
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const provider = new GoogleAuthProvider();
  const signin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userInfo = await getUser(user.uid);
        if (userInfo === null) {
          await createUser(user.uid, {
            displayName: user.displayName,
            email: user.email,
            photo: { downloadURL: "", storagePath: "" },
          } as User);
        }

        setUser?.({uid:user.uid,displayName:user.displayName,email: user.email,
          photo: { downloadURL: "", storagePath: "" }} as User);
        setAuthorized?.(true);
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Sign in error: ${errorMessage}`)
      });
  };
  const googlePopup = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          const user = result.user;
          if (user.email && user.displayName) {
            const userInfo = await getUser(user.uid);
            console.log(userInfo)
            if (userInfo === null) {
              await createUser(user.uid,{
                displayName: user.displayName,
                email: user.email,
                photo: { downloadURL: "", storagePath: "" },
              } as User);
            }
            setUser?.({uid:user.uid,displayName:user.displayName,email: user.email,
              photo: { downloadURL: "", storagePath: "" }} as User);
            setAuthorized?.(true);
            await delay(500);
            navigate("/");
          }
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Sign in error: ${errorMessage}`)
      });
  };
  const register = (email: string, password: string, username: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await createUser(user.uid,{
          displayName: user.displayName,
          email: user.email,
          photo: { downloadURL: "", storagePath: "" },
        } as User);
        setUser?.({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photo: { downloadURL: "", storagePath: "" },
        } as User);
        setAuthorized?.(true);
        await delay(500);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Creating account error: ${errorMessage}`)
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
            register(email, password, username);
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
