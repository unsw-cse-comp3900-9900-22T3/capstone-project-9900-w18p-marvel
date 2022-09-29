import { BrowserRouter, Route } from "react-router-dom";
import { TaskCard } from "../components/TaskCard";

const Components = () => {
  return (
    <Route
      path="taskcard"
      element={<TaskCard title={""} description={""} dueDate={new Date()} />}
    ></Route>
  );
};

export { Components };
