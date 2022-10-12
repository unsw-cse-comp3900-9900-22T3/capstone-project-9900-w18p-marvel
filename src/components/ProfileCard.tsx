import { Avatar } from "./Avatar"
import { Button } from "./Button"

interface ProfileCardProps {
    userName:string
    position:string
    email:string
    phoneNo:string
    url:string
}
// const url = 'data:image/jpeg;base64,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'
    
export const ProfileCard = ({userName,position, email, phoneNo, url}: ProfileCardProps) => {
    return (
      <div className="flex flex-col items-stretch bg-white-100 m-10 w-[730px] h-[300px] rounded-lg">
        <div className="divide-y divide-gray-300">
          <div className="flex flex-basis: | auto ml-8 bg-white w-[690px] h-[100px]">
            <div className="mt-4">
              <Avatar src="" size="xl" rounded="sm" />
            </div>
            <div className="text-sm font-bold text-black mt-6 ml-6">
              Vicki Chen
            </div>
            <div className="text-sm font-light text-black mt-12 ml-[-75px]">
              Scrum Master
            </div>
          </div>
          <div className="flex flex-basis: | auto ml-8 bg-white w-[690px] h-[100px]">
            <div className="flex1 mt-2">
              <div className="text-sm font-bold text-gray-500 m-4">
                EMAIL ADDRESS
              </div>
              <div className="text-sm font-bold text-black m-4">
                vickichen98@gmail.com
              </div>
            </div>
            <div className="flex1 mt-2 ml-3">
              <div className="text-sm font-bold text-gray-500 m-4">
                PHONE NUMBER
              </div>
              <div className="text-sm font-bold text-black m-4">0420202020</div>
            </div>
            <div className="flex1 mt-2 ml-3">
              <div className="text-sm font-bold text-gray-500 m-4">USER ID</div>
              <div className="text-sm font-bold text-black m-4">0000001</div>
            </div>
          </div>

          <div className="flex flex-basis: | auto ml-8 bg-white w-[690px] h-[100px]">
            <div className="mt-7">
              <Button
                theme="gray"
                size="hug"
                rounded="2xl"
                label="Edit Profile"
              />
            </div>
            <div className="mt-7 ml-[450px]">
              <Button
                theme="gray"
                size="hug"
                rounded="2xl"
                label="Save Profile"
              />
            </div>
          </div>
        </div>
      </div>
    );
  
  
  
//   <div className="text-yellow-500">Write your component here</div>;
};

// export { ProfileCard };
