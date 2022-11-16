

type Size = "hug" | "fill";

type Rounded = "none" | "2xl";


interface Props {
    size: Size;
    rounded?: Rounded;
    value: Array<string>;
}


export const DropDownList = ({
    size,
    rounded = "2xl",

}: Props) => {
    const data = [
        { value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    ]


    return (


        <div className={`flex flex-row items-center ${size === "hug" ? "w-fit" : "w-full"} `}>
            <div className={`flex flex-row bg-gray-100 items-center h-11 rounded-${rounded} pl-3 mr-3`}>
                <input list="timerange" id="timerangechoice" name="timerangechoice" />
                <div className={`flex`}>
                    <datalist id="timerange" >
                        {data.map((item: any) => (
                            item.value.map((items: any) => {
                                return <option key={items.toString()}>{items}</option>
                                console.log({ items })
                            })
                        ))}

                    </datalist>

                </div>
            </div>
            <div className={`flex`}>Days</div>
        </div>


    );
};
