import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Task, User } from "../api/type";
import { uid } from "uid";
import { faker } from "@faker-js/faker";
import { queryAllUsers } from "../api/user";
import { reorder, sample } from "../utils/array";
import { queryMyProjects } from "../api/project";
import { useApp } from "../App";
import { createTask, queryAllTasksByProjectId } from "../api/task";
import _ from "lodash";
import { TaskCard } from "./TaskCard";

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

export function DND() {
  const [data, setData] = useState<{}>({});
  const { user } = useApp();

  const genData = async () => {
    const allUsers = await queryAllUsers("");
    console.log(allUsers);
    const allProjects = await queryMyProjects(user?.uid!);
    const dummyTasks = Array(25)
      .fill(0)
      .map(
        (n) =>
          ({
            id: uid(8),
            createdAt: faker.date.recent(),
            createdBy: sample(allUsers).uid,
            description: faker.lorem.sentence(),
            dueDate: faker.date.future(),
            projectId: sample(allProjects).id,
            laneName: sample(["Todo", "Ongoing", "QA", "Done"]),
            status: "start",
            title: faker.lorem.slug(),
            cover: { downloadURL: "", storagePath: "" },
          } as Task)
      );
    console.log(dummyTasks);
    dummyTasks.forEach((t) => {
      createTask(
        t.title,
        t.status,
        t.dueDate,
        t.description,
        t.createdBy,
        t.createdAt,
        t.projectId,
        t.laneName,
        null
      );
    });
  };

  const fetchData = async () => {
    const allProjects = await queryMyProjects(user?.uid!);
    const tasks = await queryAllTasksByProjectId(sample(allProjects).id);
    const lanes: any = {};
    tasks.forEach((t) => {
      if (!(t.laneName in lanes)) {
        lanes[t.laneName] = [];
      }
      lanes[t.laneName].push(t);
    });
    setData(lanes);
    console.log(lanes);
  };

  useEffect(() => {
    // genData()
    fetchData();
  }, [user]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;
    console.log(sourceId, destinationId);

    if (sourceId === destinationId) {
      const items = reorder(data[sourceId], source.index, destination.index);
      const newState = _.cloneDeep(data);
      newState[sourceId] = items;
      setData(newState);
    } else {
      const result = move(
        data[sourceId],
        data[destinationId],
        source,
        destination
      );
      console.log(result);
      const newState = _.cloneDeep(data);
      newState[sourceId] = result[sourceId];
      newState[destinationId] = result[destinationId];

      setData(newState);
    }
  }

  return (
    <div>
      <div className="flex flex-row h-full gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(data).map(([key, tasks]) => (
            <Droppable key={key} droppableId={`${key}`}>
              {(provided: any, snapshot: any) => (
                <div className="h-full py-[72px] px-6 rounded-3xl bg-gray-50 relative">
                  <div className="absolute left-6 top-6 font-bold text-base text-gray-100">{key}</div>
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="scroll flex flex-col h-full gap-4 overflow-scroll overflow-x-hidden "
                  >
                    {tasks?.map((item: Task, index: number) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided: any, snapshot: any) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className=""
                          >
                            <TaskCard
                              id={item.id}
                              title={item.title}
                              description={item.description}
                              dueDate={item.dueDate}
                              collaborators={[]}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
