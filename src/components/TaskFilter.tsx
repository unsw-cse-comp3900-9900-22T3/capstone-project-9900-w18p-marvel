import { Button } from "./Button";
import TDataRangePicker from "./DataRangePicker";
import { Input } from "./Input";
import { SearchBox } from "./SearchBox";
import Select from "./Select";

interface Props {}

export const TaskFilter = ({}: Props) => {
  return (
    <div className="w-[432px] my-[200px] bg-white-100 rounded-3xl">
      <div className="divide-y divide-solid divide-gray-20 w-full h-full">
        <div className="w-full px-4 py-3">
          <Input type={"search"} />
        </div>
        <div className="flex flex-col gap-4 w-full p-4">
          <div className="w-full">
            <p className="mb-4 font-bold text-xs text-gray-100">
              COLLABORATORS
            </p>
            <Select defaultValue={""} />
          </div>
          <div className="w-full">
            <p className="mb-4 font-bold text-xs text-gray-100">TITLE</p>
            <Input type={"text"} />
          </div>
          <div className="w-full">
            <p className="mb-4 font-bold text-xs text-gray-100">DESCRIPTION</p>
            <Input type={"text"} />
          </div>
          <div className="w-full">
            <p className="mb-4 font-bold text-xs text-gray-100">TITLE</p>
            <Input type={"text"} />
          </div>
          <TDataRangePicker />
        </div>
        <div className="flex justify-between p-4 gap-6">
            <Button theme={"gray"} size={"fill"} label={"Cancel"}/>
            <Button theme={"blue"} size={"fill"} label={"Search"}/>
        </div>
      </div>
    </div>
  );
};
