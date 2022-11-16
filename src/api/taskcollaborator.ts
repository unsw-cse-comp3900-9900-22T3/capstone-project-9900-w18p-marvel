import { getApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import Fuse from "fuse.js";
import _ from "lodash";
import { getTask, queryAllTasksByCriterion } from "./task";
import {
  TaskCollaborator,
  Role,
  Task,
  User,
  ProjectCollaborator,
} from "./type";
import { getUser } from "./user";

export const updateTaskCollaborators = async (
  uids: Array<string>,
  taskId: string
) => {
  const app = getApp();
  const db = getFirestore(app);
  const collaborators = await queryCollaboratorsInTask(taskId);
  collaborators.map(async (c: TaskCollaborator) => {
    await removeTaskCollaborator(c.userId, taskId);
  });
  uids.map(async (id: string) => {
    await addCollaborator(id, taskId);
  });
};

export const queryCollaboratorsInTask: (
  taskId: string
) => Promise<Array<TaskCollaborator>> = async (taskId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const q = query(
    collection(db, "taskcollaborators"),
    where("taskId", "==", taskId)
  );

  const querySnapshot = await getDocs(q);
  const data: Array<TaskCollaborator> = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as TaskCollaborator);
  });
  return data;
};

export const queryAllTaskCollaborators: () => Promise<
  Array<TaskCollaborator>
> = async () => {
  const app = getApp();
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "taskcollaborators"));
  const data: Array<TaskCollaborator> = [];
  querySnapshot.forEach((doc) => {
    if (doc.id !== "placeholder") {
      data.push({
        id: doc.id,
        ...doc.data(),
      } as TaskCollaborator);
    }
  });

  return data;
};

export const queryTaskCollaboratorsByKeyword: (
  keyword: string
) => Promise<Array<TaskCollaborator>> = async (keyword: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const userSnapshot = await getDocs(collection(db, "users"));
  const users: Array<User> = [];
  userSnapshot.forEach((doc) => {
    users.push({ uid: doc.id, ...(doc.data() as User) } as User);
  });
  let ids = [];
  if (keyword === "") {
    ids = users.map((item) => item.uid);
  } else {
    const fuse = new Fuse(users, { keys: ["name", "email"] });
    const result = fuse.search(`'${keyword}`);
    ids = result.map((item) => item.item.uid);
  }

  const q = query(
    collection(db, "taskcollaborators"),
    where("userId", "in", ids)
  );

  const querySnapshot = await getDocs(q);
  const data: Array<TaskCollaborator> = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as TaskCollaborator);
  });
  return data;
};

export const addCollaborator: (userId: string, taskId: string) => void = async (
  userId: string,
  taskId: string
) => {
  const app = getApp();
  const db = getFirestore(app);
  await addDoc(collection(db, "taskcollaborators"), {
    taskId,
    userId,
  } as TaskCollaborator);
};

export const removeTaskCollaborator: (
  userId: string,
  taskId: string
) => void = async (userId: string, taskId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const q = query(
    collection(db, "taskcollaborators"),
    where("taskId", "==", taskId),
    where("userId", "==", userId)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (snapshot) => {
    const id = snapshot.id;
    deleteDoc(doc(db, "taskcollaborators", id));
  });
};

export const removeAllTaskCollaborator: () => void = async () => {
  const app = getApp();
  const db = getFirestore(app);
  const coll = await queryAllTaskCollaborators();

  coll.forEach(async (c) => {
    deleteDoc(doc(db, "taskcollaborators", c.id));
  });
};

export const queryAllMyTaskIds = async (userId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const q = query(
    collection(db, "taskcollaborators"),
    where("userId", "==", userId)
  );

  const querySnapshot = await getDocs(q);
  const data: Array<string> = [];
  querySnapshot.forEach(async (doc: any) => {
    data.push(doc.data()?.taskId);
  });

  return _.uniq(data);
};

export const queryTaskCollaboratorIdsByTaskId = async (taskId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const q = query(
    collection(db, "taskcollaborators"),
    where("taskId", "==", taskId)
  );

  const querySnapshot = await getDocs(q);
  const data: Array<string> = [];
  querySnapshot.forEach(async (doc: any) => {
    data.push(doc.data()?.userId);
  });

  return _.uniq(data);
};

export const queryConnectedTaskCollaborator = async (userId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const myTaskIds = await queryAllMyTaskIds(userId);
  let collaborators: Array<string> = [];
  await Promise.all(
    myTaskIds.map(async (taskId: string) => {
      const collabs = await queryTaskCollaboratorIdsByTaskId(taskId);
      collaborators = collaborators.concat(collabs);
    })
  );
  collaborators = _.uniq(collaborators);
  const data: Array<User> = [];
  await Promise.all(
    collaborators.map(async (id: string) => {
      const user = await getUser(id);
      if (user) data.push(user);
    })
  );
  return data;
};


export const queryConnectedTasks = async (userId:string,collabratorId:string)=>{
  const app = getApp();
  const db = getFirestore(app);
  const myTaskIds = await queryAllMyTaskIds(userId);
  const collabTaskIds = await queryAllMyTaskIds(collabratorId)
  const intersection = _.intersection(myTaskIds,collabTaskIds)
  const data:Array<Task> = []
  await Promise.all(intersection.map(async (id:string)=>{
    const task = await getTask(id)
    if(task) data.push(task)
  }))
  return data
}