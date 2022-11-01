import * as React from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from "@mui/material";
interface Props {
  defaultValue: string
  onChange?: (val: string) => void
}

export default function TSelect({ defaultValue, onChange }: Props) {
  const [status, setStatus] = React.useState("");

  const handleChange = (event: any) => {
    setStatus(event.target.value);
    onChange?.(event.target.value)
  };
  console.log(defaultValue)
  return (
    <Select
      color="primary"
      placeholder="Choose one…"
      defaultValue={defaultValue}
      variant="filled"
      onChange={handleChange}
    >
      <MenuItem value="begin">start</MenuItem >
      <MenuItem value="ongoing">In Progress</MenuItem >
      <MenuItem value="done">Complete</MenuItem >
    </Select>
  );
}
