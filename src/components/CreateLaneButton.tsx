import { PlusIcon } from "../icons/PlusIcon";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import { TextInput } from "./TextInput";
import { useEffect, useRef, useState } from "react";

interface Props {
  onComplete?: (name: string) => void;
}

export const CreateLaneButton = ({ onComplete }: Props) => {
  const [editing, setEditing] = useState<boolean>(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setEditing(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  return (
    <div
      className="items-center flex justify-between cursor-pointer hover:scale-95 transition h-20 rounded-2xl bg-gray-50 px-6 w-[324px] text-gray-100"
      onClick={() => {
        setEditing(true);
      }}
      ref={wrapperRef}
    >
      <div className="flex gap-3 items-center">
        <PlusIcon className={"text-gray-100"} />
        {editing && (
          <TextInput
            disabled={false}
            defaultFocus={true}
            onComplete={(val: string) => {
              setEditing(false);
              onComplete?.(val);
            }}
          />
        )}
        {!editing && (
          <p className="text-sm font-bold text-gray-100">Add New Lane</p>
        )}
      </div>
      <SplitscreenIcon color="inherit" />
    </div>
  );
};
