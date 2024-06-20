import { CgLoadbar } from "react-icons/cg";

const Loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      {" "}
      <CgLoadbar className='animate-spin w-7 h-7 mr-3' /> Loading...
    </div>
  );
};

export default Loading;
