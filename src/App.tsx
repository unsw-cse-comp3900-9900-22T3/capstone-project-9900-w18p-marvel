import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import { Avatar } from "./components/Avatar";
import { Checkbox } from "./components/Checkbox";
import { Landing } from "./components/Landing";
import { ProfileButton } from "./components/Profilebutton";
import { TaskCard } from "./components/TaskCard";
import { TaskDetail } from "./components/TaskDetail";
import { UserProfile } from "./components/UserProfile";
import { Components } from "./pages/Components";
import { Home } from "./pages/Home";
import { Interceptor } from "./pages/Interceptor";
import { Project } from "./pages/Projects";
import { Signup } from "./pages/Signup";
import { Tasks } from "./pages/Tasks";

function App() {
  const [authorized, setAuthorized] = useState<boolean>(true);

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
          <Route path="signup" element={<Signup />}></Route>
          <Route path="components">
            <Route path="peter">
              <Route path="taskdetail" element={<TaskDetail />}></Route>
            </Route>
            <Route path="guohao">
              <Route path="profile" element={<UserProfile />}></Route>
            </Route>
            <Route path="vicki">
              <Route path="profileButton" element={<ProfileButton />}></Route>
              <Route path="avatar" element={<Avatar
                id={'001'}
                avatar={ 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4KWIKwaojpneN3qgoL7Ec2xT4EcwjbQ8ImQ&usqp=CAU'}
                name={'vicki chen'}
                email={'1234@gmail.com'}
              
              />}></Route>
            </Route>
            <Route path="pigeon">
              <Route path="landing" element={<Landing />}></Route>
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
