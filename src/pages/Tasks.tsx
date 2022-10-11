import { createTask } from "../api/task";
import { Button } from "../components/Button"
import { uid } from 'uid'
import { faker } from '@faker-js/faker';
import { useApp } from "../App";

interface Props {}

export const Tasks = ({}: Props) => {
  const {user} = useApp()
  return (
    <>
      Tasks
      <Button
        theme={"gray"}
        size={"hug"}
        label={"Create Task"}
        onClick={() => {
          if(user){
            createTask(
              `sample task`,
              "start",
              uid(20),
              faker.date.future(),
              faker.lorem.paragraph(),
              user.uid,
              new Date(),
            );
          }else{
            alert("Not login!")
          }
        }}
      />
      <>GanttView</>
    </>
  );
};
