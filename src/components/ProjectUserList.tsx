import { UserListItem } from "./UserListItem";
import { Button } from "./Button";
import { Input } from "./Input";
import { useEffect, useState } from "react";
import { delay } from "../utils/promise";
import _ from "lodash";
import {
  queryActiveCollaboratorsInProject,
  queryTaskCollaboratorsByKeyword,
  removeTaskCollaborator,
} from "../api/taskcollaborator";
import { getUser, queryAllUsers } from "../api/user";
import {
  queryAllProjectCollaborators,
  queryProjectCollaboratorsByProjectId,
  removeProjectCollaborator,
} from "../api/projectCollaborator";
import { ProjectCollaborator, Task } from "../api/type";
import { requestConnection } from "../api/connection";
import { useApp } from "../App";
import { queryAllTasksByProjectId } from "../api/task";

interface Props {
  projectId: string | null;
}

export const ProjectUserList = ({ projectId }: Props) => {
  const { user } = useApp();
  const [data, setData] = useState<any>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [selected, setSelected] = useState<Array<string>>([]);

  const fetch = async (keyword: string) => {
    if (projectId) {
      const allUsers = await queryAllUsers(keyword);
      const collaborators = allUsers.map((c) => c.uid);
      const projectCollabs = await queryProjectCollaboratorsByProjectId(
        projectId
      );

      const activeUserIds = projectCollabs.map(
        (c: ProjectCollaborator) => c.userId
      );
      const unselected = collaborators
        .filter((x) => !activeUserIds.includes(x!))
        .map((item) => ({ id: item, selected: false }));
      const selected = collaborators
        .filter((x) => activeUserIds.includes(x!))
        .map((x) => ({ id: x, selected: true }));
      const all = unselected.concat(selected);
      let users: any = [];
      await Promise.all(
        all.map(async (c) => {
          const info = await getUser(c.id!);
          users.push({ ...info, selected: c.selected });
        })
      );
      setData(users);
    }
  };

  useEffect(() => {
    fetch(keyword);
  }, [projectId]);

  const onConfirm = async (
    selected: Array<string>,
    projectId: string,
    userId: string
  ) => {
    const activeCollabs = await queryProjectCollaboratorsByProjectId(projectId);
    const owners = activeCollabs.filter(
      (c: ProjectCollaborator) => c.role === "owner"
    );
    const ownerIds = owners.map((o) => o.userId);
    const activeUserIds = activeCollabs.map((c) => c.id);
    const add = selected.filter((x) => !activeUserIds.includes(x!));
    const sub = activeUserIds.filter((x) => !selected.includes(x!));
    console.log(add, sub);
    add.forEach((id) => {
      requestConnection(id, userId, new Date(), projectId, "owner");
    });
    const ownerRemain = ownerIds.filter((x) => !sub.includes(x));
    if (ownerRemain.length > 0) {
      sub.forEach(async (id) => {
          removeProjectCollaborator(id, projectId);
          const tasks = await queryAllTasksByProjectId(projectId);
          tasks.forEach((t: Task) => {
            removeTaskCollaborator(id, t.id);
          });
      });
    }else{
      alert("A project must has one or more owners!")
    }
  };

  return (
    <div className="flex flex-col gap-0 w-72 bg-white-100 rounded-3xl ">
      <div className="h-20 w-full py-3 px-3">
        <Input
          type={"text"}
          onChange={async (val: string) => {
            setKeyword(val);
            fetch(val);
          }}
        />
      </div>
      <div className="h-0 w-full border-t border-gray-100"></div>
      <div className="w-full flex flex-col pt-6 pb-7 pl-7 pr-9 gap-6 max-h-80 overflow-scroll">
        {data.map((item: any) => (
          <UserListItem
            key={item.uid}
            src={item.photo.downloadURL}
            name={item.displayName}
            description={item.email}
            onValueChange={(val: boolean) => {
              const _copy = _.cloneDeep(selected);
              if (val) {
                _copy.push(item.uid);
                setSelected(_copy);
              } else {
                const index = _copy.findIndex((c) => c === item.uid);
                _copy.splice(index, 1);
                setSelected(_copy);
              }
            }}
            defaultSelected={item.selected}
            checkboxDisabled={false}
          ></UserListItem>
        ))}
      </div>
      <div className="h-0 w-full border-t border-gray-100"></div>
      <div className="h-20 w-full pt-4 pb-5 pl-7 pr-8">
        <Button
          theme="blue"
          size="fill"
          rounded="2xl"
          label={"Confirm"}
          onClick={async () => {
            if (projectId && user?.uid) {
              onConfirm(selected, projectId, user.uid);
            }
          }}
        ></Button>
      </div>
    </div>
  );
};
