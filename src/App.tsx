import { useContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import { Checkbox } from "./components/Checkbox";
import { TaskCard } from "./components/TaskCard";
import { TaskDetail } from "./components/TaskDetail";
import { UploadedCard } from "./components/UploadedCard";
import { NewUploadedCard } from "./components/NewUploadedCard";
import { NewCommentBox } from "./components/NewCommentBox";
import { CommentBox } from "./components/CommentBox";
import { DescriptionBox } from "./components/DescriptionBox";
import { TaskInfoBlock } from "./components/TaskInfoBlock";
import { UserProfile } from "./components/UserProfile";
import { DropDownList } from "./components/DropDownList";
import { Components } from "./pages/Components";
import { Home } from "./pages/Home";
import { Interceptor } from "./pages/Interceptor";
import { Project } from "./pages/Projects";
import { Landing } from "./pages/Landing";
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

            <Route path="login" element={<Landing />}></Route>
            <Route path="components">
              <Route path="peter">
                <Route path="taskdetail" element={<TaskDetail />}></Route>
                <Route path="uploadedcard" element={<UploadedCard FileAddedTime="20/Dec/2022 10:21:20"/>}></Route>
                <Route path="newuploadedcard" element={<NewUploadedCard />}></Route>
                <Route path="newcommentbox" element={<NewCommentBox />}></Route>
                <Route path="commentbox" element={<CommentBox />}></Route>
                <Route path="descriptionbox" element={<DescriptionBox Description="Currently, no matter whether in school, company, etc, people usually need to work as a team for the final assignment, product manufacturing, or software development. It will be very complicated if the group is very large, or the big project is divided into various small teams. Such as if the company wants to build new products, they need to have several teams, one for design, one for manufacture, one for testing, etc. If there is no well- structured system to manage the task, the products might be missing some critical parts, causing some severe issues and failing the project."/>}></Route>
                <Route path="taskinfoblock" element={<TaskInfoBlock TaskID="1234" TaskName="Marvel Task Management System" DueDate = "20/Dec/2022"/>}></Route>
                <Route path="dropdownlist" element={<DropDownList />}></Route>
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
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
