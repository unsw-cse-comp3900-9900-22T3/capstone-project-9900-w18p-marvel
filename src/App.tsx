import { useContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import { Checkbox } from "./components/Checkbox";
<<<<<<< HEAD
import { Landing } from "./components/Landing";
import { ProfileCard } from "./components/ProfileCard";
=======
>>>>>>> dev
import { TaskCard } from "./components/TaskCard";
import { TaskDetail } from "./components/TaskDetail";
import { UserListItem } from "./components/UserListItem";
import { UserProfile } from "./components/UserProfile";
import { Components } from "./pages/Components";
import { Home } from "./pages/Home";
import { Interceptor } from "./pages/Interceptor";
import { Project } from "./pages/Projects";
import { Landing } from "./pages/Landing";
import { Tasks } from "./pages/Tasks";
import { initializeApp } from "firebase/app";
import { User } from "firebase/auth";
import React from "react";

interface ContextProps {
  app: any;
  authorized: boolean;
  setAuthorized: Function|undefined;
  user: User | undefined;
  setUser: Function|undefined;
}

const AppContext = React.createContext<ContextProps>({
  app: undefined,
  authorized: false,
  setAuthorized: undefined,
  user: undefined,
  setUser: undefined,
});

export function useApp() {
  return useContext(AppContext)
}

export function App() {
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [user, setUser] = useState<User|undefined>();
  

  const firebaseConfig = {
    apiKey: "AIzaSyB71hVo6nDG7esBu5XAmwmwBGj0WC3eXys",
    authDomain: "theverypulseofthemachine.firebaseapp.com",
    databaseURL:
      "https://theverypulseofthemachine-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "theverypulseofthemachine",
    storageBucket: "theverypulseofthemachine.appspot.com",
    messagingSenderId: "1060047788619",
    appId: "1:1060047788619:web:276fb848ea28a9c1958bce",
  };

  const app = initializeApp(firebaseConfig);

  useEffect(()=>{
    if(user) setAuthorized(true)
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
      setUser,
    };
  }, [
    authorized,user
  ])

  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route path="/components">
          <Route path="peter">
            <Route path="taskdetail" element={<TaskDetail />}></Route>
          </Route>
          <Route path="vicki">
            <Route path="pc" element={<ProfileCard />}></Route>
            <Route path="test" element={<UserListItem />}></Route>
          </Route>
          <Route path="guohao">
            <Route path="profile" element={<UserProfile />}></Route>
          </Route>
          <Route path="pigeon">
            <Route path="landing" element={<Landing />}></Route>
            <Route path="checkbox" element={<Checkbox defaultValue={false} onValueChange={(val)=>{console.log(val)}}/>}></Route>
          </Route>
          <Route path="anan">
            <Route
              path="taskcard"
              element={
                <TaskCard title={""} description={""} dueDate={new Date()} />
              }
            ></Route>
=======
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
            <Route path="login" element={<Landing />}></Route>
            <Route path="components">
              <Route path="peter">
                <Route path="taskdetail" element={<TaskDetail />}></Route>
              </Route>
              <Route path="guohao">
                <Route path="profile" element={<UserProfile />}></Route>
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
>>>>>>> dev
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
