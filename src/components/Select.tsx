import { Select as JoySelect } from "@mui/joy";
import * as React from "react";
import Option from "@mui/joy/Option";

interface Props{
  defaultValue:string
  onChange?:(val:string)=>void
}

export default function Select({defaultValue,onChange}:Props) {
  const [status, setStatus] = React.useState("");

  const handleChange = (event: any) => {
    setStatus(event.target.value);
    onChange?.(event.target.value)
  };

  return (
    <JoySelect
      color="primary"
      placeholder="Choose one…"
      defaultValue={defaultValue}
      variant="plain"
      onChange={handleChange}
    >
      <Option value="ongoing">In Progress</Option>
      <Option value="done">Complete</Option>
    </JoySelect>
  );
}
