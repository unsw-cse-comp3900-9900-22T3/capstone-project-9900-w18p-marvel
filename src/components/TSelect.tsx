import * as React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
interface Props {
  defaultValue: string;
  onChange?: (val: string) => void;
  values: Array<string>;
}

export default function TSelect({ defaultValue, onChange, values=[] }: Props) {
  const [status, setStatus] = React.useState("");

  const handleChange = (event: any) => {
    setStatus(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <Select
      color="primary"
      placeholder="Choose one…"
      defaultValue={defaultValue}
      variant="filled"
      onChange={handleChange}
      sx={{
        width: "102px",
        height: "40px",
        borderRadius: "16px",
        "&.MuiSelect-select": {
          borderRadius: "9999px",
        },
        "&.MuiSelect-filled": {
          backgroundColor: "transparent",
        },
        "&.MuiInputBase-input": {
          backgroundColor: "transparent",
          fontWeight:700,
        },
        "&.MuiFilledInput-input": {
          // backgroundColor:'transparent',
          fontWeight:700,
        },
        "&.MuiInputBase-root": {
          backgroundColor:'rgba(143, 146, 161, 0.1)',
          // display:'none'
        },
        "&.MuiFilledInput-root": {
          // backgroundColor:'transparent',
          // display:'none'
          paddingTop:"6px",
          paddingLeft:"4px",
          fontWeight:700,
        },
        "&.MuiFilledInput-underline": {
          // backgroundColor:'transparent',
        },
        "&::before": {
          display: "none",
        },
        "&::after": {
          display: "none",
        },
        "&.MuiSelect-iconFilled": {
          color: "#ffffff",
          backgroundColor: "#ffffff",
          display: "none",
        },
        "&.MuiSvgIcon-root": {
          color: "#ffffff",
          backgroundColor: "#ffffff",
          display: "none",
        },
        "& svg path": {
          fill: "rgba(0, 0, 0, 0.2)",
          backgroundColor: "#ffffff",
        },
      }}
    >
      {values.map((v) => (
        <MenuItem value={v}>{v}</MenuItem>
      ))}
    </Select>
  );
}
