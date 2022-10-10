type Theme = "blue" | "gray" | "transparent";

type Size = "hug" | "fill";

type Rounded = "none" | "2xl";

const themeDefaultMapping = new Map<Theme, string>([
  ["blue", "bg-blue-100  text-sm text-white-100 font-bold hover:bg-blue-200"],
  ["gray", "bg-white-5 text-sm text-black font-bold hover:bg-white-10"],
  ["transparent", "bg-transparent text-sm text-black font-bold hover:bg-white-5"],
]);


interface Props {
    theme: Theme;
    size: Size;
    label: string;
    rounded?: Rounded;
  }
  
  export const DropDownList = ({
    theme,
    size,
    label,
    rounded = "2xl",
  }: Props) => {
    return (

        
     <div className = {`appNameSelect`}>
        <a>test</a>
        <input id='appName' type='text' list='AppNamelist'></input>
        <datalist id='AppNamelist'>
            <option>1</option>
            <option>12</option>
            <option>13</option>
        </datalist>
        
        </div>

    );
  };
