import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Project, Task, TaskCollaborator, User } from "../api/type";
import { uid } from "uid";
import { faker } from "@faker-js/faker";
import { queryAllUsers } from "../api/user";
import { reorder, sample } from "../utils/array";
import {
  deleteAllProject,
  queryAllProjects,
  queryMyProjects,
} from "../api/project";
import { useApp } from "../App";
import {
  createTask,
  deleteAllTask,
  queryAllTasksByProjectId,
} from "../api/task";
import _ from "lodash";
import { TaskCard } from "./TaskCard";
import {
  queryCollaboratorsInTask,
  updateCollaborators,
} from "../api/collaborator";
import { urlToFile } from "../utils/converter";

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

export function DND(props) {
  const [data, setData] = useState<{}>({});
  const [collaboratorLists, setCollaboratorLists] =
    useState<Map<string, Array<TaskCollaborator>>>();
  const { user } = useApp();

  const fetchData = async () => {
    console.log(props.id)
    const tasks = await queryAllTasksByProjectId(props.id);
    const lanes: any = {};
    const map = new Map<string, Array<TaskCollaborator>>();
    await Promise.all(
      tasks.map(async (t) => {
        if (!(t.laneName in lanes)) {
          lanes[t.laneName] = [];
        }
        lanes[t.laneName].push(t);
      })
    );
    await Promise.all(
      tasks.map(async (t) => {
        const collaborators = await queryCollaboratorsInTask(t.id);
        console.log(collaborators);
        collaborators.map((c) => {
          map.set(t.id, collaborators);
        });
      })
    );
    setCollaboratorLists(map);
    setData(lanes);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                  <div className="absolute left-6 top-6 font-bold text-base text-gray-100">
                    {key}
                  </div>
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
                              collaborators={
                                collaboratorLists?.get(item.id) || []
                              }
                              image={item.cover?.downloadURL}
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
