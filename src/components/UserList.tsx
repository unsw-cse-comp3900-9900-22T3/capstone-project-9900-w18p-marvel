import { UserListItem } from "./UserListItem"
import { Button } from "./Button"

export const UserList = ()=>{
    const data = [
        {src:'',name:'11',description:'@11'},
        {src:'',name:'22',description:'@22'},
        {src:'',name:'33',description:'@33'},
        {src:'',name:'44',description:'@44'},
    ]
    return (
        <div className="flex flex-col gap-0 w-72">
            <div className="h-20 w-full py-3 px-3">
                This is a search
            </div>
            <div className="h-0 w-full border-t border-gray-100"></div>
            <div className="w-full flex flex-col pt-6 pb-7 pl-7 pr-9 gap-6">
                {data.map((item) => (
                <UserListItem
                    src={item.src}
                    name={item.name}
                    description={item.description}
                ></UserListItem>
                ))}
            </div>
            <div className="h-0 w-full border-t border-gray-100"></div>
            <div className="h-20 w-full pt-4 pb-5 pl-7 pr-8">
                <Button
                    theme="blue"
                    size="fill"
                    rounded="2xl" 
                    label={"Confirm"}
                ></Button>
            </div>
      </div>
    );
}