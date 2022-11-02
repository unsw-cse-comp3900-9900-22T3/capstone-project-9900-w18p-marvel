import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Lane,
  Project,
  ProjectCollaborator,
  Role,
  Status,
  Task,
  TaskCollaborator,
  User,
} from "../api/type";
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
  deleteTask,
  queryAllTasksByProjectId,
  updateTask,
} from "../api/task";
import _ from "lodash";
import { TaskCard } from "./TaskCard";
import {
  queryCollaboratorsInTask,
  updateCollaborators,
} from "../api/taskcollaborator";
import { urlToFile } from "../utils/converter";
import {
  collection,
  CollectionReference,
  DocumentData,
  getFirestore,
  onSnapshot,
  query,
  QuerySnapshot,
  Timestamp,
  where,
} from "firebase/firestore";
import { CircularProgress } from "@mui/material";
import { delay } from "../utils/promise";
import { PlusIcon } from "../icons/PlusIcon";
import { CreateLaneButton } from "./CreateLaneButton";
import { Popup } from "./Popup";
import { useNavigate, useParams } from "react-router-dom";
import { TaskDetail } from "./TaskDetail";
import {
  addLane,
  deleteLane,
  queryLaneByProjectId,
  updateLane,
} from "../api/lane";
import { TextInput } from "./TextInput";
import {
  getProjectCollaboratorByUserId,
  queryProjectCollaboratorsByProjectId,
} from "../api/projectCollaborator";
import { getApp } from "firebase/app";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

const sortByDueDate = (list: Array<Task>) => {
  const _list = _.cloneDeep(list);
  console.log(
    list.map((l) => {
      const timestamp = l.dueDate;
      return timestamp;
    })
  );
  _list.sort((a: Task, b: Task) => a.dueDate.getTime() - b.dueDate.getTime());
  return _list;
};

const addTask = (
  title: string,
  description: string,
  lanes: any,
  laneName: string,
  userId: string,
  projectId: string,
  dueDate: Date,
  status: Status
) => {
  const _lanes = _.cloneDeep(lanes);
  const lane = _lanes[laneName];
  if (lane) {
    const task = {
      id: uid(20),
      createdAt: new Date(),
      createdBy: userId,
      description,
      title,
      dueDate,
      status,
      projectId,
    } as Task;
    lane.items.push(task);
  }
};

interface Props {}

export function TaskDND({}: Props) {
  let { id: projectId } = useParams();
  const [data, setData] = useState<any>();
  const [collaboratorLists, setCollaboratorLists] =
    useState<Map<string, Array<TaskCollaborator>>>();
  const { user,role,setRole } = useApp();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Array<string>>();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  let projectCollabObserver: any = null;
  let tasksObserver: any = null;

  const fetchData = async () => {
    if (projectId && user?.uid) {
      const collabInfo = await getProjectCollaboratorByUserId(
        projectId,
        user.uid
      );
      setRole(collabInfo?.role || "viewer");
      const projCollbs = await queryProjectCollaboratorsByProjectId(projectId);
      const collabIds = projCollbs.map((p: ProjectCollaborator) => p.userId);
      if (collabIds.includes(user.uid)) {
        const tasks = await queryAllTasksByProjectId(projectId);
        setTasks(tasks.map((t) => t.id));
        const lanes = await queryLaneByProjectId(projectId);

        const laneMap: any = {};
        lanes.forEach((l) => {
          console.log(l.id);
          laneMap[l.id] = { name: l.name, loading: false, items: [] };
        });

        const map = new Map<string, Array<TaskCollaborator>>();
        tasks.forEach((t) => {
          console.log(t.laneId);
          laneMap[t.laneId].items.push(t);
        });

        for (const [key, value] of Object.entries(laneMap)) {
          laneMap[key].loading = false;
          laneMap[key].items = sortByDueDate(laneMap[key].items);
        }
        setData(laneMap);
      } else {
        alert(
          "Sorry, you don't have permission to view this project, either you entered the wrong project id or you have been removed from the member system of this project."
        );
        navigate("/projects");
      }
    }
  };

  useEffect(() => {
    if (user?.uid) {
      const app = getApp();
      const db = getFirestore(app);
      if (projectCollabObserver) projectCollabObserver();
      const projectCollabQ = query(
        collection(db, "projectcollaborators"),
        where("userId", "==", user.uid)
      );
      projectCollabObserver = onSnapshot(projectCollabQ, (querySnapshot) => {
        fetchData();
      });
      if (tasksObserver) tasksObserver();
      const taskQ = query(
        collection(db, "tasks"),
        where("projectId", "==", projectId)
      );
      tasksObserver = onSnapshot(taskQ, (querySnapshot) => {
        fetchData();
      });
      return () => {
        if (projectCollabObserver) projectCollabObserver();
        if (tasksObserver) tasksObserver();
      };
    }
    fetchData();
  }, []);

  async function onDragEnd(result: any) {
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
      let items: any = reorder(
        data[sourceId].items,
        source.index,
        destination.index
      );
      items = sortByDueDate(items);
      newState[sourceId].items = items;
      setData(newState);
    } else {
      updateTask(
        data[sourceId].items[source.index].id,
        null,
        null,
        null,
        null,
        destinationId
      );
      const result = move(
        data[sourceId],
        data[destinationId],
        source,
        destination
      );
      newState[sourceId].items = sortByDueDate(data[sourceId]);
      newState[destinationId].items = sortByDueDate(data[destinationId]);

      setData(newState);
    }
    for (const [key, value] of Object.entries(newState)) {
      newState[key].loading = false;
    }
    await delay(1000);
    setData(newState);
  }

  const deleteLaneAndTasks = (laneId: string, data: any) => {
    const laneMap = _.cloneDeep(data);
    if (laneMap[laneId]) {
      laneMap[laneId].items.forEach((item: Task) => deleteTask(item.id));
      deleteLane(laneId);
      delete laneMap.laneId;
      setData(laneMap);
    }
  };

  return (
    data && <>
      <div className="flex flex-row h-full w-full gap-4 overflow-x-scroll scrollbar-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(data).map(([key, lane]: any) => (
            <Droppable key={key} droppableId={`${key}`}>
              {(provided: any, snapshot: any) => (
                <div className="h-full py-[72px] w-[372px] shrink-0 px-6 rounded-2xl bg-gray-50 relative overflow-hidden">
                  {lane?.loading && (
                    <div className="transition absolute inset-0 bg-white-100 opacity-95 z-50">
                      <div className="flex w-full h-full flex-col justify-center items-center gap-4">
                        <span>Reordering By Due Date</span>
                        <CircularProgress />
                      </div>
                    </div>
                  )}
                  <div className="absolute flex justify-between items-center inset-x-6 top-6 font-bold text-base text-gray-100">
                    {role !== "viewer" && (
                      <TextInput
                        defaultValue={lane?.name}
                        disabled={false}
                        onComplete={(val: string) => {
                          updateLane(key, val);
                        }}
                        fontWeight="font-bold"
                      />
                    )}
                    {role === "viewer" && (
                      <p className="font-bold text-gray-100 text-sm">
                        {lane?.name}
                      </p>
                    )}
                    {role !== "viewer" && (
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          deleteLaneAndTasks(key, data);
                        }}
                      >
                        <DeleteOutlineIcon color="inherit" />
                      </div>
                    )}
                  </div>
                  {role !== "viewer" && (
                    <div
                      className="absolute left-6 right-6 bottom-6 flex justify-between cursor-pointer hover:scale-95 transition"
                      onClick={async () => {
                        if (user?.uid && projectId) {
                          setOpen(true);
                          const id = uid(20);
                          const newTask = await createTask(
                            id,
                            "",
                            "start",
                            faker.date.future(),
                            "",
                            user?.uid,
                            new Date(),
                            projectId,
                            key
                          );
                          setSelectedTaskId(id);
                        }
                      }}
                    >
                      <div className="flex gap-3 items-center">
                        <PlusIcon className={"text-gray-100"} />
                        <p className="text-sm font-bold text-gray-100">
                          Add Another Task
                        </p>
                      </div>
                    </div>
                  )}
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="scroll flex flex-col h-full gap-4 overflow-scroll overflow-x-hidden scrollbar-auto"
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
                              onClick={() => {
                                setOpen(true);
                                setSelectedTaskId(item.id);
                              }}
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
        {data && role !== "viewer" && (
          <CreateLaneButton
            onComplete={(name: string) => {
              if (projectId) {
                const laneId = uid(20);
                addLane(laneId, projectId, name);
                const _data: any = _.cloneDeep(data);
                _data[laneId] = { loading: false, items: [],name:name };
                setData(_data);
              }
            }}
          />
        )}
      </div>
      {selectedTaskId && (
        <Popup
          open={open}
          onClose={() => {
            setOpen(false);
            fetchData();
          }}
        >
          <TaskDetail id={selectedTaskId} />
        </Popup>
      )}
    </>
  );
}
