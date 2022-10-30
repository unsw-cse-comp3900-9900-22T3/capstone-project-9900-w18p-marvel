import { useContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import { Checkbox } from "./components/Checkbox";
import { ProfileCard } from "./components/ProfileCard";
import { TaskCard } from "./components/TaskCard";
import { TaskDetail } from "./components/TaskDetail";
import { UserListItem } from "./components/UserListItem";
import { UserProfile } from "./components/UserProfile";
import { getStorage } from "firebase/storage";
import { Home } from "./pages/Home";
import { Interceptor } from "./pages/Interceptor";
import { ProjectPage } from "./pages/ProjectPage";
import { Landing } from "./pages/Landing";
import { FirebaseApp, getApp, initializeApp } from "firebase/app";

import React from "react";
import { ProjectCard } from "./components/ProjectCard";
import { CreateProject } from "./components/CreateProject";
import { APITest } from "./pages/APITest";
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Invitation, User } from "./api/type";
import { getUser } from "./api/user";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { TaskDND } from "./components/TaskDND";

interface ContextProps {
  app: FirebaseApp | null;
  authorized: boolean;
  setAuthorized: Function | null;
  user: User | null;
  setUser: Function | null;
  invitations: Array<any>;
  projectId: string|null;
  setProjectId: Function | null;
}

const AppContext = React.createContext<ContextProps>({
  app: null,
  authorized: false,
  setAuthorized: null,
  user: null,
  setUser: null,
  invitations: [],
  projectId: "",
  setProjectId: null,
});

export function useApp() {
  return useContext(AppContext);
}

export function App() {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [invitations, setInvitations] = useState<Array<any>>([]);
  const [inited, setInited] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string|null>(null);
  const firebaseConfig = {
    apiKey: "AIzaSyB71hVo6nDG7esBu5XAmwmwBGj0WC3eXys",
    authDomain: "theverypulseofthemachine.firebaseapp.com",
    databaseURL:
      "https://theverypulseofthemachine-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "theverypulseofthemachine",
    storageBucket: "gs://theverypulseofthemachine.appspot.com/",
    messagingSenderId: "1060047788619",
    appId: "1:1060047788619:web:276fb848ea28a9c1958bce",
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  let unsubscribeInvitation: any = null;
  let unsubscribeUser: any = null;

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      setAuthorized(true);
    }
  }, []);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    // console.log("user state change:",user)
  });

  useEffect(() => {
    if (user) {
      console.log("user change:", user);
      localStorage.setItem("user", JSON.stringify(user));
    }
    // else setAuthorized(false)
  }, [user]);

  const fetchUserInfo = async (userId: string) => {
    if (userId) {
      console.log("app:user:", userId);
      const userInfo = await getUser(userId);
      if (userInfo) {
        setUser({ ...userInfo, uid: userId });
      }
    }
  };

  useEffect(() => {
    if (user?.uid && authorized && !inited) {
      setInited(true);
      fetchUserInfo(user?.uid!);
      if (unsubscribeInvitation) {
        unsubscribeInvitation();
      }
      if (unsubscribeUser) {
        unsubscribeUser();
      }
      const app = getApp();
      const db = getFirestore(app);
      const q = query(
        collection(db, "invitations"),
        where("inviteeId", "==", user.uid)
      );
      unsubscribeInvitation = onSnapshot(q, (querySnapshot) => {
        const data: any = [];
        querySnapshot.forEach((doc) => {
          data.push({...doc.data(),id:doc.id} as Invitation);
        });
        setInvitations(data);
      });
    }
  }, [user, authorized, inited]);

  const providerValues = useMemo(() => {
    return {
      app,
      authorized,
      setAuthorized,
      user,
      setUser,
      invitations,
      projectId,
      setProjectId,
    };
  }, [authorized, user, invitations, projectId]);

  return (
    <AppContext.Provider value={providerValues}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <Interceptor>
                  <Home>
                    <ProjectPage />
                  </Home>
                </Interceptor>
              }
            ></Route>
            <Route path="projects">
              <Route
                index
                element={
                  <Interceptor>
                    <Home>
                      <ProjectPage />
                    </Home>
                  </Interceptor>
                }
              ></Route>
              <Route
                path=":id"
                element={
                  <Interceptor>
                    <Home>
                      <TaskDND />
                    </Home>
                  </Interceptor>
                }
              ></Route>
            </Route>
            <Route
              path="tasks"
              element={
                <Interceptor>
                  <Home>
                    <TaskDND />
                  </Home>
                </Interceptor>
              }
            ></Route>
            <Route
              path="profile"
              element={
                <Interceptor>
                  <Home>
                    <ProfileCard />
                  </Home>
                </Interceptor>
              }
            ></Route>
            <Route
              path="api"
              element={
                <Interceptor>
                  <Home>
                    <APITest />
                  </Home>
                </Interceptor>
              }
            ></Route>
            <Route path="login" element={<Landing />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
