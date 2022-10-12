import { UserListAdmin } from "./UserListAdmin"
import { Button } from "./Button"

export const UserList2 = ()=>{
    const data = [
        {src:'',name:'11',description:'@11'},
        {src:'',name:'22',description:'@22'},
        {src:'',name:'33',description:'@33'},
        {src:'',name:'44',description:'@44'},
    ]
    return (
      <div className="flex flex-col gap-0 w-[408px]">
        <div className="h-20 w-full py-3 px-4">
            <Button
                theme="gray"
                size="fill"
                rounded="2xl" 
                label={"Search"}
            ></Button>
        </div>
        <div className="h-0 w-full border-t border-gray-100"></div>
        <div className="w-full flex flex-col pt-6 pb-7 pl-8 pr-8 gap-6">
          {data.map((item) => (
            <UserListAdmin
              src={item.src}
              name={item.name}
              description={item.description}
            ></UserListAdmin>
          ))}
        </div>
        <div className="h-0 w-full border-t border-gray-100"></div>
        <div className="flex flex-row h-20 w-full pt-4 pb-5">
            <div className="pl-4 pr-5 h-10 w-44">
                <Button
                    theme="gray"
                    size="hug"
                    rounded="2xl" 
                    label={"Cancel"}
                ></Button>
            </div>
            <div>
                <Button
                    theme="blue"
                    size="hug"
                    rounded="2xl" 
                    label={"Search"}
                ></Button>
            </div>
        </div>
      </div>
    );
}