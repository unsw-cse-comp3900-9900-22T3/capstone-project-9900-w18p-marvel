

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
    value=[5,6,7, 8]

  }: Props) => {
  
    
    return (
    
        


    <div className ={`flex flex-row items-center`}>
        <div className ={`flex flex-row bg-gray-100 items-center ${size === "hug" ? "w-fit" : "w-full"} h-11 rounded-${rounded} pl-3 mr-3`}>
        <input list="timerange" id="timerangechoice" name="timerangechoice"/>
            <div className={`flex`}>
            <datalist id="timerange" >
            ${value}.map((index) => (
                <option>{value}[index]</option>
              ));
                <option>2</option>
     
            </datalist>
           
            </div>
        </div>
        <div className={`flex`}>Days</div>
    </div>
    





                






    );
  };
