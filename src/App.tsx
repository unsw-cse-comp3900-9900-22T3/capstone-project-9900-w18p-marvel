import { useContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import { Checkbox } from "./components/Checkbox";
// <<<<<<< HEAD
// import { Landing } from "./components/Landing";
import { ProfileCard } from "./components/ProfileCard";
// =======
// >>>>>>> dev
import { TaskCard } from "./components/TaskCard";
import { TaskDetail } from "./components/TaskDetail";
import { UserListItem } from "./components/UserListItem";
import { UserProfile } from "./components/UserProfile";
import { getStorage } from "firebase/storage";
import { Home } from "./pages/Home";
import { Interceptor } from "./pages/Interceptor";
import { Project } from "./pages/Projects";
import { Landing } from "./pages/Landing";
import { Tasks } from "./pages/Tasks";
import { FirebaseApp, getApp, initializeApp } from "firebase/app";

import React from "react";
import { CreateProject } from "./components/CreateProject";
import { CreateProject2 } from "./components/CreateProject2";
import { APITest } from "./pages/APITest";
import { collection, doc, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { User } from "./api/type";
import { getUser } from "./api/user";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface ContextProps {
  app: FirebaseApp|null;
  authorized: boolean;
  setAuthorized: Function|null;
  user: User | null;
  invitations:Array<any>
}

const AppContext = React.createContext<ContextProps>({
  app: null,
  authorized: false,
  setAuthorized: null,
  user: null,
  invitations:[]
});

export function useApp() {
  return useContext(AppContext)
}

export function App() {
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [user, setUser] = useState<User|null>(null);
  const [invitations,setInvitations] = useState<Array<any>>([])
  

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

  let unsubscribeInvitation:any = null
  let unsubscribeUser:any = null

  useEffect(()=>{
    const user = localStorage.getItem("user")
    if(user){
      setUser(JSON.parse(user))
    }
  },[])
  
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    setUser(user)
  });
  

  useEffect(()=>{
    if(user) {
      setUser(user)
      setAuthorized(true);
      localStorage.setItem("user",JSON.stringify(user))

      if(unsubscribeInvitation){
        unsubscribeInvitation()
      }
      if(unsubscribeUser){
        unsubscribeUser()
      }
      const app = getApp();
      const db = getFirestore(app);
      const q = query(collection(db, "invitations"), where("inviteeId", "==", user.uid));
      unsubscribeInvitation = onSnapshot(q, (querySnapshot) => {
        const data:any = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        setInvitations(data)
      })
    }
    else setAuthorized(false)
  },[user])

  useEffect(()=>{
    console.log(authorized)
  },[authorized])
  
  const providerValues = useMemo(() => {
    return {
      app,
      authorized,
      setAuthorized,
      user,
      invitations
    };
  }, [
    authorized,user,invitations
  ])

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
                    <Project />
                  </Home>
                </Interceptor>
              }
            ></Route>
            <Route
              path="projects"
              element={
                <Interceptor>
                  <Home>
                    <Project />
                  </Home>
                </Interceptor>
              }
            ></Route>
            <Route
              path="tasks"
              element={
                <Interceptor>
                  <Home>
                    <Tasks />
                  </Home>
                </Interceptor>
              }
            ></Route>
            <Route
              path="profile"
              element={
                <Interceptor>
                  <Home>
                    <ProfileCard
                      userName={""}
                      position={""}
                      email={""}
                      phoneNo={""}
                      url={""}
                    />
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
            <Route path="components">
              <Route path="peter">
                <Route path="taskdetail" element={<TaskDetail />}></Route>
              </Route>
              <Route path="vicki">
                <Route path="pc" element={<ProfileCard />}></Route>
                <Route path="test" element={<UserListItem />}></Route>
              </Route>
              <Route path="guohao">
                <Route path="profile" element={<UserProfile />}></Route>
                <Route
                  path="createproject"
                  element={
                    <CreateProject
                      src={
                        "data:image/jpeg;base64,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"
                      }
                      name={"xxxsdasdadbk"}
                    />
                  }
                ></Route>
                <Route
                  path="createproject2"
                  element={
                    <CreateProject2
                      src={
                        "data:image/jpeg;base64,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"
                      }
                      name={"xxxsdasdadbk"}
                    />
                  }
                ></Route>
              </Route>
              <Route path="pigeon">
                <Route
                  path="checkbox"
                  element={
                    <Checkbox
                      defaultValue={false}
                      onValueChange={(val) => {
                        console.log(val);
                      }}
                    />
                  }
                ></Route>
              </Route>
              <Route path="anan">
                <Route
                  path="taskcard"
                  element={
                    <TaskCard
                      title={""}
                      description={""}
                      dueDate={new Date()}
                    />
                  }
                ></Route>
              </Route>
            </Route>
            {/* >>>>>>> dev */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
