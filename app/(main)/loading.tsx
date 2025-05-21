import { TbLoader2 } from "react-icons/tb";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[10] flex items-center justify-center bg-white h-screen w-screen">
      <TbLoader2 className="animate-spin" size={40} color="#03070b" />
    </div>
  );
};

export default Loading;