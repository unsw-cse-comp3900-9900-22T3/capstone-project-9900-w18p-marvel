import { Role } from "../api/type";
import { Avatar } from "./Avatar";
import { Checkbox } from "./Checkbox";
import TSelect from "./TSelect";

interface Props {
  src: string;
  name: string;
  description: string;
  onValueChange?: (val: boolean) => void;
  defaultSelected: boolean;
  checkboxDisabled: boolean;
  showRole: boolean;
  role:Role
}

export const UserListItem = ({
  src,
  name,
  description,
  onValueChange,
  defaultSelected,
  checkboxDisabled,
    role = "viewer",
  showRole = false,
}: Props) => {
  return (
    <div className="flex flex-row items-center w-fit h-11 justify-between gap-10">
      <div className="flex items-center">
        <Avatar src={src} size="md" rounded="full" />
        <div className="flex flex-col items-start ml-5 w-28 overflow-hidden">
          <div className="text-sm font-bold">{name}</div>
          <div className="text-xs font-medium text-gray-100">{description}</div>
        </div>
      </div>
      {showRole && (
        <TSelect
          defaultValue={role}
          values={["owner", "editor", "viewer"]}
          onChange={(val: string) => {}}
        />
      )}
      <div className="flex">
        <div>
          <Checkbox
            defaultValue={defaultSelected}
            onValueChange={(val: boolean) => {
              onValueChange?.(val);
            }}
            disabled={checkboxDisabled}
          />
        </div>
      </div>
    </div>
  );
};
