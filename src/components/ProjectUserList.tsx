import { UserListItem } from "./UserListItem";
import { Button } from "./Button";
import { Input } from "./Input";
import { useEffect, useState } from "react";
import { delay } from "../utils/promise";
import _ from "lodash";
import {
  queryActiveCollaboratorsInProject,
  queryAllCollaborators,
} from "../api/taskcollaborator";
import { getUser, queryAllUsers } from "../api/user";

interface Props {
  projectId: string;
  onConfirm: (collaborators: Array<string>) => void;
}

export const ProjectUserList = ({ projectId, onConfirm }: Props) => {
  const [data, setData] = useState<any>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [selected, setSelected] = useState<Array<string>>([]);

  const fetch = async (keyword: string) => {
    const allUsers = await queryAllUsers(keyword);
    const collaborators = allUsers.map((c) => c.uid);
    const activeUserIds = await queryActiveCollaboratorsInProject(projectId);
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
  };

  useEffect(() => {
    fetch(keyword);
  }, [projectId]);

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
            src={item.photo.downloadURL}
            name={item.displayName}
            description={item.email}
            onValueChange={(val: boolean) => {
              if (val) {
                const _copy = _.cloneDeep(selected);
                _copy.push(item.id);
                setSelected(_copy);
              } else {
                const index = selected.findIndex(item.id);
                const _copy = _.cloneDeep(selected);
                _copy.splice(index, 1);
                setSelected(_copy);
              }
            }}
            defaultSelected={item.selected}
            checkboxDisabled={item.selected}
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
            if (selected.length > 0) onConfirm(selected);
          }}
        ></Button>
      </div>
    </div>
  );
};
