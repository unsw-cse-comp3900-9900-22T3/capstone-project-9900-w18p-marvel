import { Select as JoySelect } from "@mui/joy";
import * as React from "react";
import Option from "@mui/joy/Option";

export default function Select() {
  const [status, setStatus] = React.useState("");

  const handleChange = (event: any) => {
    setStatus(event.target.value as string);
  };

  return (
    <JoySelect defaultValue={status} onChange={handleChange}>
      <Option value="ongoing">In Progress!</Option>
      <Option value="done">Complete!</Option>
    </JoySelect>
  );
}
