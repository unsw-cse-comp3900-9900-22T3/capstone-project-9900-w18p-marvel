import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { uid } from "uid";
import { removeAllCollaborator, updateCollaborators } from "../api/collaborator";
import {
  createProject,
  deleteAllProject,
  queryAllProjects,
} from "../api/project";
import { downloadFile, uploadFile } from "../api/storage";
import {
  createTask,
  deleteAllTask,
  queryAllTasksByProjectId,
} from "../api/task";
import { Project, Task } from "../api/type";
import {
  getUser,
  queryAllUsers,
  requestConnection,
  updateUserProfile,
} from "../api/user";
import { useApp } from "../App";
import { Button } from "../components/Button";
import { sample } from "../utils/array";
import { urlToFile } from "../utils/converter";

export const APITest = () => {
  const { user, setUser, invitations } = useApp();
  useEffect(() => {
    if (invitations) {
      console.log("invitation change:", invitations);
    }
  }, [invitations]);
  useEffect(() => {
    console.log("user:", user);
  }, [user]);
  const [file, setFile] = useState<File>();

  const genProjects = async () => {
    await deleteAllProject();
    const allUsers = await queryAllUsers("");
    console.log("alluser:", allUsers);
    const dummyImageURL = Array(100)
      .fill(0)
      .map((n) => faker.image.image(500, 500, true));
    let files: Array<File> = [];
    await Promise.all(
      dummyImageURL.map(async (url) => {
        const file = await urlToFile(url);
        files.push(file);
      })
    );
    console.log("image gened:", files);

    const dummyProjects = Array(25)
      .fill(0)
      .map((n) => {
        const file = sample(files);
        uploadFile(
          file,
          "image",
          (p) => {},
          (err) => {},
          async (URL, path) => {
            const data = {
              id: uid(20),
              createdAt: faker.date.recent(),
              createdBy: sample(allUsers).uid,
              title: faker.name.jobTitle(),
              cover: { downloadURL: URL, storagePath: path },
            } as Project;
            await createProject(
              data.title,
              data.cover,
              data.createdBy,
              data.createdAt
            );
          }
        );
      });
  };

  const genTasks = async () => {
    await removeAllCollaborator()
    await deleteAllTask();
    const allUsers = await queryAllUsers("");
    console.log("alluser:", allUsers);
    const projects = await queryAllProjects();
    const dummyImageURL = Array(100)
      .fill(0)
      .map((n) => faker.image.image(500, 500, true));
    let files: Array<File> = [];
    await Promise.all(
      dummyImageURL.map(async (url) => {
        const file = await urlToFile(url);
        files.push(file);
      })
    );
    console.log("image gened:", files);
    const dummyTasks = Array(500)
      .fill(0)
      .map((n) => {
        const file = sample(files);
        uploadFile(
          file,
          "image",
          (p) => {},
          (err) => {},
          async (URL, path) => {
            const data = {
              id: uid(20),
              createdAt: faker.date.recent(),
              createdBy: sample(allUsers).uid,
              description: faker.lorem.sentence(),
              dueDate: faker.date.future(),
              projectId: sample(projects).id,
              laneName: sample(["Todo", "Ongoing", "QA", "Done"]),
              status: "start",
              title: faker.name.jobTitle(),
              cover: { downloadURL: URL, storagePath: path },
            } as Task;
            await createTask(
              data.id,
              data.title,
              data.status,
              data.dueDate,
              data.description,
              data.createdBy,
              data.createdAt,
              data.projectId,
              data.laneName,
              file
            );
            await updateCollaborators(
              allUsers!.map((u) => u.uid),
              data.id
            );
          }
        );
      });
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Get All Tasks"}
        onClick={() => {
          queryAllTasksByProjectId("");
        }}
      />
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Invite"}
        onClick={() => {
          if (user?.uid) {
            requestConnection(user.uid, user.uid, new Date());
          } else {
            alert("user is null");
          }
        }}
      />
      <div className="flex flex-row gap-2">
        <input
          type={"file"}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <Button
          theme={"blue"}
          size={"hug"}
          label={"Update My Photo"}
          onClick={async () => {
            if (user?.uid && file) {
              await updateUserProfile(
                user.uid,
                undefined,
                undefined,
                file,
                (user) => {
                  console.log("xxx", user, setUser);
                  setUser?.(user);
                }
              );
            } else {
              alert("user is null");
            }
          }}
        />
      </div>
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Gen Fake Projects"}
        onClick={() => {
          if (user?.uid) {
            genProjects();
          } else {
            alert("user is null");
          }
        }}
      />
       <Button
        theme={"blue"}
        size={"hug"}
        label={"Gen Fake Tasks"}
        onClick={() => {
          if (user?.uid) {
            genTasks();
          } else {
            alert("user is null");
          }
        }}
      />
    </div>
  );
};
