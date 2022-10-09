import { UserListAdmin } from "./UserListAdmin"

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
            This is a search
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
        <div className="h-20 w-full pt-4 pb-5">
            <span className="pl-4 pr-5">Cancel</span>
            <span>Search</span>
        </div>
      </div>
    );
}