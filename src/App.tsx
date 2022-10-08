import { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import { Checkbox } from "./components/Checkbox";
import { TaskCard } from "./components/TaskCard";
import { TaskDetail } from "./components/TaskDetail";
import { UserProfile } from "./components/UserProfile";
import { Components } from "./pages/Components";
import { Home } from "./pages/Home";
import { Interceptor } from "./pages/Interceptor";
import { Project } from "./pages/Projects";
import { Landing } from "./pages/Landing";
import { Tasks } from "./pages/Tasks";
import { initializeApp } from "firebase/app";
import { User } from "firebase/auth";


function App() {
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [user, setUser] = useState<User | undefined>(undefined);
  

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
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Interceptor authorized={authorized}>
                <Home>
                  <Project />
                </Home>
              </Interceptor>
            }
          ></Route>
          <Route
            path="projects"
            element={
              <Interceptor authorized={authorized}>
                <Home>
                  <Project />
                </Home>
              </Interceptor>
            }
          ></Route>
          <Route
            path="tasks"
            element={
              <Interceptor authorized={authorized}>
                <Home>
                  <Tasks />
                </Home>
              </Interceptor>
            }
          ></Route>
          <Route
            path="login"
            element={
              <Landing
                onSignin={(user: User) => {
                  setUser(user);
                }}
              />
            }
          ></Route>
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
                  <TaskCard title={""} description={""} dueDate={new Date()} />
                }
              ></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
