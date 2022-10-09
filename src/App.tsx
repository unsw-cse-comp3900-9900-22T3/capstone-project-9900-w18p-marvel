import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import { AAvatar } from "./components/AAvatar";
import { Checkbox } from "./components/Checkbox";
import { Landing } from "./components/Landing";
import { Notification } from "./components/Notification";
import { TaskCard } from "./components/TaskCard";
import { TaskDetail } from "./components/TaskDetail";
import { UserList } from "./components/UserList";
import { UserList2 } from "./components/UserList2";
import { UserListAdmin } from "./components/UserListAdmin";
import { UserListItem } from "./components/UserListItem";
import { UserProfile } from "./components/UserProfile";
import { Components } from "./pages/Components";
import { Notification2 } from "./components/Notification2";
import { UserList3 } from "./components/UserList3";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/components">
          <Route path="peter">
            <Route path="taskdetail" element={<TaskDetail />}></Route>
          </Route>
          <Route path="guohao">
            <Route path="profile" element={<UserProfile />}></Route>
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
            <Route path="avatar" element={<AAvatar size='lg' rounded='sm' src="" onClick={()=>{}}/>}></Route>
            <Route path="userlist" element={<UserList/>}></Route>
            <Route path="notification" element={<Notification src={""} name={""} description={""}/>}></Route>
            <Route path="notification2" element={<Notification2 src={""} name={""} description={""}/>}></Route>
            <Route path="userlist2" element={<UserList2/>}></Route>
            <Route path="userlistadmin" element={<UserListAdmin src={""} name={""} description={""}/>}></Route>
            <Route path="userlist3" element={<UserList3/>}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
