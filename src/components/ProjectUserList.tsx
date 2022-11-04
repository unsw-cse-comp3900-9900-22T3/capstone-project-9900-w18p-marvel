import { UserListItem } from "./UserListItem";
import { Button } from "./Button";
import { Input } from "./Input";
import { useEffect, useState } from "react";
import { delay } from "../utils/promise";
import _ from "lodash";
import {
  queryTaskCollaboratorsByKeyword,
  removeTaskCollaborator,
} from "../api/taskcollaborator";
import { getUser, queryAllUsers } from "../api/user";
import {
  queryAllProjectCollaborators,
  queryProjectCollaboratorsByProjectId,
  removeProjectCollaborator,
  updateProjectCollaborator,
} from "../api/projectCollaborator";
import { ProjectCollaborator, Role, Task, User } from "../api/type";
import { requestConnection } from "../api/connection";
import { useApp } from "../App";
import { queryAllTasksByProjectId } from "../api/task";

interface Props {
  projectId: string | null;
  onComplete?:()=>void
}

export const ProjectUserList = ({ projectId,onComplete }: Props) => {
  const { user,setSnackbarText,setSnackbarOpen } = useApp();
  const [data, setData] = useState<any>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [selected, setSelected] = useState<Array<{ id: string; role: Role }>>(
    []
  );

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
        .map((item) => ({
          id: item,
          selected: false,
          role: projectCollabs.find((c) => c.userId === item)?.role || "viewer",
        }));
      const selected = collaborators
        .filter((x) => activeUserIds.includes(x!))
        .map((item) => ({
          id: item,
          selected: true,
          role: projectCollabs.find((c) => c.userId === item)?.role || "viewer",
        }));
      const all = unselected.concat(selected);
      let users: any = [];
      await Promise.all(
        all.map(async (c) => {
          const info = await getUser(c.id!);
          users.push({ ...info, selected: c.selected, role: c.role });
        })
      );
      setSelected(selected.map((u: any) => ({ id: u.id, role: u.role })));
      setData(users);
    }
  };

  useEffect(() => {
    fetch(keyword);
  }, [projectId]);

  const onConfirm = async (
    selected: Array<{ id: string; role: Role }>,
    projectId: string,
    userId: string
  ) => {
    const activeCollabs = await queryProjectCollaboratorsByProjectId(projectId);
    const owners = activeCollabs.filter(
      (c: ProjectCollaborator) => c.role === "owner"
    );
    const activeUserIds = activeCollabs.map((c) => c.userId);
    const selectedIds = selected.map((s) => s.id);
    const intersect = selectedIds.filter((x) => activeUserIds.includes(x));
    const add = selectedIds.filter((x) => !activeUserIds.includes(x));
    const sub = activeUserIds.filter((x) => !selectedIds.includes(x));
    console.log("active:", activeUserIds, "selected:", selectedIds);
    console.log("add:", add, "sub:", sub, "union:", intersect);

    const ownerRemain = selected.filter((x) => x.role === "owner");
    if (ownerRemain.length > 0) {
      add.forEach((id) => {
        requestConnection(
          id,
          userId,
          new Date(),
          projectId,
          selected.find((s) => s.id === id)!.role
        );
      });
      intersect.forEach(id=>{
        updateProjectCollaborator(projectId,id,selected.find((s) => s.id === id)!.role)
      })
      sub.forEach(async (id) => {
        removeProjectCollaborator(id, projectId);
        const tasks = await queryAllTasksByProjectId(projectId,[],"","",null,null);
        tasks.forEach((t: Task) => {
          removeTaskCollaborator(id, t.id);
        });
      });
      onComplete?.()
    } else {
      setSnackbarText("A project must has one or more owners!")
      setSnackbarOpen(true)
    }
  };

  return (
    <div className="flex flex-col gap-0 w-fit bg-white-100 rounded-3xl ">
      <div className="h-20 w-full py-3 px-3">
        <Input
          type={"text"}
          onChange={async (val: string) => {
            setKeyword(val);
            fetch(val);
          }}
        />
      </div>
      <div className="h-0 w-full border-t border-gray-200"></div>
      <div className="w-fit flex flex-col pt-6 pb-7 pl-7 pr-9 gap-6 max-h-80 overflow-y-scroll scrollbar-auto">
        {data.map((item: any) => (
          <UserListItem
            key={item.uid}
            src={item.photo.downloadURL}
            name={item.displayName}
            description={item.email}
            onValueChange={(val: boolean) => {
              const _copy = _.cloneDeep(selected);
              if (val) {
                _copy.push({ id: item.uid, role: item.role });
                setSelected(_copy);
              } else {
                const index = _copy.findIndex((c) => c.id === item.uid);
                _copy.splice(index, 1);
                setSelected(_copy);
              }
            }}
            defaultSelected={item.selected}
            checkboxDisabled={false}
            showRole={true}
            role={item.role}
            onRoleChange={(role: Role) => {
              const _copy = _.cloneDeep(selected);
              _copy.forEach((c) => {
                if (c.id === item.uid) {
                  c.role = role;
                }
              });
              setSelected(_copy);
            }}
          ></UserListItem>
        ))}
      </div>
      <div className="h-0 w-full border-t border-gray-200"></div>
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
