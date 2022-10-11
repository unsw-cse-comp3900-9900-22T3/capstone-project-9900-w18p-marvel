

type Size = "hug" | "fill";

type Rounded = "none" | "2xl";



function getlistitem(values){
    const selected_item = document.getElementById("timerange")
    const final_list = [...values]
    final_list.forEach(item =>{
        const option = document.createElement("option");
        option.textContent = item;
        selected_item.appendChild(option);
        
        });
}


interface Props {
    size: Size;
    rounded?: Rounded;
    value: Array<string>;
  }


  export const DropDownList = ({
    size,
    rounded = "2xl",

  }: Props) => {
    const data =[
        {value: [5,6,7, 8,9]}
    ]
  
    
    return (
    

    <div className ={`flex flex-row items-center ${size === "hug" ? "w-fit" : "w-full"} `}>
        <div className ={`flex flex-row bg-gray-100 items-center h-11 rounded-${rounded} pl-3 mr-3`}>
        <input list="timerange" id="timerangechoice" name="timerangechoice"/>
            <div className={`flex`}>
            <datalist id="timerange" >
            {data.map((item:any) => (
                item.value.map((items:any) =>{
                    return <option key={items.toString()}>{items}</option>
                    console.log({items})
                })
              ))}

     
            </datalist>
           
            </div>
        </div>
        <div className={`flex`}>Days</div>
    </div>
    

    );
  };
