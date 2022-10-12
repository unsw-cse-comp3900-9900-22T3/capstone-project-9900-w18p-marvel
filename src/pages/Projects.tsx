interface ProjectProps {}

export const Project = ({}: ProjectProps) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute left-12 top-12 text-sm text-gray-100 font-bold">
        MY PROJECT
      </div>
      <div className="w-full h-full pt-24 px-12 pb-12">
      <div className="grid"></div>
      </div>
    </div>
  );
};
