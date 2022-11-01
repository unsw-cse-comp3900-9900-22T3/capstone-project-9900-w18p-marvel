import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { uid } from "uid";
import {
  addAttachment,
  deleteAllAttachment as deleteAllAttachment,
} from "../api/attachment";
import {
  queryTaskCollaboratorsByKeyword,
  queryCollaboratorsInTask,
  removeAllTaskCollaborator,
  updateCollaborators,
} from "../api/taskcollaborator";
import { addComment, deleteAllComment } from "../api/comment";
import {
  createProject,
  deleteAllProject,
  queryAllProjects,
} from "../api/project";
import { deleteAllFile, downloadFile, uploadFile } from "../api/storage";
import {
  createTask,
  deleteAllTask,
  queryAllTasks,
  queryAllTasksByProjectId,
} from "../api/task";
import { Comment, Project, Role, Task } from "../api/type";
import {
  getUser,
  queryAllUsers,
  updateUserProfile,
} from "../api/user";
import { useApp } from "../App";
import { Button } from "../components/Button";
import { randInt, sample, sampleMultiple } from "../utils/array";
import { urlToFile } from "../utils/converter";
import {
  addProjectCollaborator,
  removeAllProjectCollaborator,
} from "../api/projectCollaborator";
import { addLane, deleteAllLanes } from "../api/lane";
import Dropdownlist_mui from "../components/Dropdownlist_mui";
import TSelect from "../components/TSelect";
import { TaskFilter } from "../components/TaskFilter";
import { Popup } from "../components/Popup";

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
  const [files, setFiles] = useState<Array<File>>([]);

  const deleteAll = () => {
    deleteAllProject();
    removeAllTaskCollaborator();
    deleteAllTask();
    deleteAllFile();
    deleteAllAttachment();
    deleteAllComment();
    deleteAllLanes();
  };

  const genProjectsAndTasks = async () => {
    await deleteAllProject();
    const allUsers = await queryAllUsers("");
    console.log("alluser:", allUsers);
    const dummyImageURL = Array(100)
      .fill(0)
      .map((n) => faker.image.image(256, 256, true));
    let imgs: Array<File> = [];
    await Promise.all(
      dummyImageURL.map(async (url) => {
        const file = await urlToFile(url);
        imgs.push(file);
      })
    );
    console.log("image gened:", imgs);

    allUsers.forEach((u) => {
      const dummyProjectIds = Array(randInt(1, 8))
        .fill(0)
        .map((n) => uid(20));
      dummyProjectIds.forEach((id) => {
        //create project
        const img = sample(imgs);
        uploadFile(
          img,
          "image",
          (p) => {},
          (err) => {},
          async (URL, path) => {
            const data = {
              id: id,
              createdAt: faker.date.recent(),
              createdBy: u.uid,
              title: faker.name.jobTitle(),
              cover: { downloadURL: URL, storagePath: path },
            } as Project;
            await createProject(
              data.id,
              data.title,
              data.cover,
              data.createdBy,
              data.createdAt
            );
          }
        );

        //select random users and creator
        const rand = Math.floor(Math.random() * 8) + 1;
        const projectCollabs = [{ id: u.uid, role: "owner" }].concat(
          sampleMultiple(allUsers, randInt(0, allUsers.length - 1))
            .map((c) => ({
              id: c.uid,
              role: sample(["owner", "editor", "viewer"]),
            }))
            .filter((c) => c.id !== u.uid)
        );
        projectCollabs.forEach((c) => {
          addProjectCollaborator(c.id!, id, c.role as Role);
        });

        sampleMultiple(
          [
            "Todo",
            "Ongoing",
            "Stopped",
            "Invalid",
            "Brainstorming",
            "QA",
            "Done",
          ],
          3
        ).forEach((n) => {
          const laneId = uid(20);
          addLane(laneId, id, n);
          const rand = Math.floor(Math.random() * 5);
          const dummyTasks = Array(rand)
            .fill(0)
            .map(async (n) => {
              const data = {
                id: uid(20),
                createdAt: faker.date.recent(),
                createdBy: sample(allUsers).uid,
                description: faker.lorem.sentence(),
                dueDate: faker.date.future(),
                projectId: id,
                laneId: laneId,
                status: "start",
                title: faker.name.jobTitle(),
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
                data.laneId
              );

              await updateCollaborators(
                sampleMultiple(
                  projectCollabs.map((u) => u.id),
                  Math.floor(Math.random() * 5)
                ),
                data.id
              );
            });
        });
      });
    });
  };

  const genComment = async () => {
    await deleteAllComment();
    const collaborators = await queryTaskCollaboratorsByKeyword("");
    await Promise.all(
      collaborators.map(async (c) => {
        console.log(c);
        const cm = {
          id: uid(20),
          createdAt: new Date(),
          createdBy: c.userId,
          content: faker.lorem.sentence(),
          taskId: c.taskId,
        } as Comment;
        addComment(cm.taskId, cm.createdBy, cm.content);
      })
    );
    console.log("operation complete");
  };

  const genAttachments = async () => {
    await deleteAllAttachment();
    const collaborators = await queryTaskCollaboratorsByKeyword("");
    collaborators.map((c) => {
      const rand = Math.random();
      if (rand > 0.35) {
        addAttachment(
          c.taskId,
          c.userId,
          sample(files),
          () => {},
          () => {},
          () => {}
        );
        if (rand < 0.7) {
          addAttachment(
            c.taskId,
            c.userId,
            sample(files),
            () => {},
            () => {},
            () => {}
          );
        }
      }
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
          // if (user?.uid) {
          //   requestConnection(user.uid, user.uid, new Date());
          // } else {
          //   alert("user is null");
          // }
        }}
      />
      <div className="flex flex-row gap-2">
        <input
          type={"file"}
          onChange={(e) => {
            if (e.target.files?.length) {
              setFiles(Array.from(e.target.files));
            }
          }}
          multiple
        />
        <Button
          theme={"blue"}
          size={"hug"}
          label={"Gen Attachments"}
          onClick={() => {
            genAttachments();
          }}
        />
      </div>
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Gen Fake Projects And Tasks"}
        onClick={() => {
          if (user?.uid) {
            genProjectsAndTasks();
          } else {
            alert("user is null");
          }
        }}
      />
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Gen Comments"}
        onClick={() => {
          if (user?.uid) {
            genComment();
          } else {
            alert("user is null");
          }
        }}
      />
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Del Comments"}
        onClick={() => {
          if (user?.uid) {
            deleteAllComment();
          } else {
            alert("user is null");
          }
        }}
      />
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Del Attach"}
        onClick={() => {
          if (user?.uid) {
            deleteAllAttachment();
          } else {
            alert("user is null");
          }
        }}
      />
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Del TaskCollabs"}
        onClick={() => {
          if (user?.uid) {
            removeAllTaskCollaborator();
          } else {
            alert("user is null");
          }
        }}
      />
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Del ProjCollabs"}
        onClick={() => {
          if (user?.uid) {
            removeAllProjectCollaborator();
          } else {
            alert("user is null");
          }
        }}
      />
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Del Tasks"}
        onClick={() => {
          if (user?.uid) {
            deleteAllTask();
          } else {
            alert("user is null");
          }
        }}
      />
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Del Lanes"}
        onClick={() => {
          if (user?.uid) {
            deleteAllLanes();
          } else {
            alert("user is null");
          }
        }}
      />
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Del Proj"}
        onClick={() => {
          if (user?.uid) {
            deleteAllProject();
          } else {
            alert("user is null");
          }
        }}
      />
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Del Files"}
        onClick={() => {
          if (user?.uid) {
            deleteAllFile();
          } else {
            alert("user is null");
          }
        }}
      />
      <Popup open={false}>
        <TaskFilter />
      </Popup>
    </div>
  );
};
