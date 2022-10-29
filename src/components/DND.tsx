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
  updateLane,
} from "../api/task";
import _ from "lodash";
import { TaskCard } from "./TaskCard";
import {
  queryCollaboratorsInTask,
  updateCollaborators,
} from "../api/collaborator";
import { urlToFile } from "../utils/converter";
import { Timestamp } from "firebase/firestore";
import { CircularProgress } from "@mui/material";
import { delay } from "../utils/promise";
import { PlusIcon } from "../icons/PlusIcon";
import { CreateLaneButton } from "./CreateLaneButton";

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = Array.from(source.items);
  const destClone = Array.from(destination.items);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId].items = sourceClone;
  result[droppableDestination.droppableId].items = destClone;

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

const sortByDueDate = (list: Array<Task>) => {
  const _list = _.cloneDeep(list);
  console.log(
    list.map((l) => {
      const timestamp = l.dueDate as Timestamp;
      return timestamp;
    })
  );
  // _list.sort((a: Task, b: Task) => a.dueDate.getTime() - b.dueDate.getTime());
  return _list;
};

export function DND(props) {
  const [data, setData] = useState<{}>({});
  const [collaboratorLists, setCollaboratorLists] =
    useState<Map<string, Array<TaskCollaborator>>>();
  const { user } = useApp();

  const fetchData = async () => {
    console.log(props.id);
    const tasks = await queryAllTasksByProjectId(props.id);
    const lanes: any = {};
    const map = new Map<string, Array<TaskCollaborator>>();
    tasks.map((t) => {
      if (!(t.laneName in lanes)) {
        lanes[t.laneName] = { loading: true, items: [] };
      }
      lanes[t.laneName].items.push(t);
    });
    await Promise.all(
      tasks.map(async (t) => {
        const collaborators = await queryCollaboratorsInTask(t.id);
        collaborators.map((c) => {
          map.set(t.id, collaborators);
        });
      })
    );

    setCollaboratorLists(map);
    console.log("1", lanes);
    // setData(lanes);
    await delay(2000);
    for (const [key, value] of Object.entries(lanes)) {
      lanes[key].loading = false;
    }
    console.log("2", lanes);
    setData(lanes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;
    let newState = _.cloneDeep(data);
    newState[sourceId].loading = true;
    newState[destinationId].loading = true;
    if (sourceId === destinationId) {
      let items = reorder(
        data[sourceId].items,
        source.index,
        destination.index
      );
      items = sortByDueDate(items);
      newState[sourceId].items = items;
      setData(newState);
    } else {
      updateLane(data[sourceId].items[source.index].id, destinationId);
      const result = move(
        data[sourceId],
        data[destinationId],
        source,
        destination
      );
      newState[sourceId] = sortByDueDate(result[sourceId]);
      newState[destinationId] = sortByDueDate(result[destinationId]);

      setData(newState);
    }
    for (const [key, value] of Object.entries(newState)) {
      newState[key].loading = false;
    }
    await delay(1000);
    setData(newState);
  }

  return (
    <div className="flex flex-row h-full w-full gap-4 pb-4 overflow-hidden">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(data).map(([key, lane]) => (
          <Droppable key={key} droppableId={`${key}`}>
            {(provided: any, snapshot: any) => (
              <div className="h-full py-[72px] w-[372px] px-6 rounded-3xl bg-gray-50 relative overflow-hidden">
                {lane?.loading && (
                  <div className="transition absolute inset-0 bg-white-100 opacity-95 z-50">
                    <div className="flex w-full h-full flex-col justify-center items-center gap-4">
                      <span>Reordering By Due Date</span>
                      <CircularProgress />
                    </div>
                  </div>
                )}
                <div className="absolute left-6 top-6 font-bold text-base text-gray-100">
                  {key}
                </div>
                <div
                  className="absolute left-6 right-6 bottom-6 flex justify-between cursor-pointer hover:scale-95 transition"
                  onClick={() => {}}
                >
                  <div className="flex gap-3 items-center">
                    <PlusIcon className={"text-gray-100"} />
                    <p className="text-sm font-bold text-gray-100">
                      Add Another Task
                    </p>
                  </div>
                </div>
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="scroll flex flex-col h-full gap-4 overflow-scroll overflow-x-hidden "
                >
                  {lane?.items?.map((item: Task, index: number) => (
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
      <CreateLaneButton
        onComplete={(name: string) => {
          const _data: any = _.cloneDeep(data);
          _data[name] = { loading: false, items: [] };
          setData(_data);
        }}
      />
    </div>
  );
}
