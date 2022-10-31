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
import { Comment, Project, Task } from "../api/type";
import {
  getUser,
  queryAllUsers,
  requestConnection,
  updateUserProfile,
} from "../api/user";
import { useApp } from "../App";
import { Button } from "../components/Button";
import { sample, sampleMultiple } from "../utils/array";
import { urlToFile } from "../utils/converter";
import {
  addProjectCollaborator,
  removeAllProjectCollaborator,
} from "../api/projectCollaborator";
import { addLane, deleteAllLanes } from "../api/lane";

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
    let files: Array<File> = [];
    await Promise.all(
      dummyImageURL.map(async (url) => {
        const file = await urlToFile(url);
        files.push(file);
      })
    );
    console.log("image gened:", files);
    const dummyIds = Array(50)
      .fill(0)
      .map((n) => uid(20));
    allUsers.forEach((u) => {
      dummyIds.forEach((id) => {
        addProjectCollaborator(
          u.uid!,
          id,
          sample(["owner", "editor", "viewer"])
        );
      });
    });

    dummyIds.map((id) => {
      const file = sample(files);
      uploadFile(
        file,
        "image",
        (p) => {},
        (err) => {},
        async (URL, path) => {
          const data = {
            id: id,
            createdAt: faker.date.recent(),
            createdBy: sample(allUsers).uid,
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
    });

    dummyIds.forEach((projectId) => {
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
        addLane(laneId, projectId, n);
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
              projectId: projectId,
              laneId: laneId,
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
              data.laneId
            );

            await updateCollaborators(
              sampleMultiple(
                allUsers!.map((u) => u.uid),
                Math.floor(Math.random() * 5)
              ),
              data.id
            );
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
    </div>
  );
};
