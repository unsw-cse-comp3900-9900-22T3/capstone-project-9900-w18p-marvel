import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import { AAvatar } from "./components/AAvatar";
import { Checkbox } from "./components/Checkbox";
import { Landing } from "./components/Landing";
import { Notification } from "./components/Notification";
import { TaskCard } from "./components/TaskCard";
import { TaskDetail } from "./components/TaskDetail";
import { UserListItem } from "./components/UserListItem";
import { UserProfile } from "./components/UserProfile";
import { Components } from "./pages/Components";

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
            <Route path="userlistitem" element={<UserListItem/>}></Route>
            <Route path="noti" element={<Notification/>}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
