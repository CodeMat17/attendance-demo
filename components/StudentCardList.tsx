import Link from "next/link";
import { useState } from "react";
import { CgLoadbar } from "react-icons/cg";
import { TbEdit } from "react-icons/tb";

type Props = {
  count: number | null;
  filteredList:
    | {
        id: string;
        fullname: string;
        course: string;
        email: string;
        phone: string;
      }[]
    | undefined;
};

type Student = {
  id: string;
  fullname: string;
  course: string;
  phone: string;
  email: string;
  //   count: number;
  // other fields...
};

const StudentCardList = ({ filteredList, count }: Props) => {
  const [students, setStudents] = useState<Student[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Adjust page size as needed

  if (!filteredList && filteredList === null) {
    return (
      <div className='w-full py-32 flex items-center justify-center'>
        <CgLoadbar className='animate-spin w-6 h-6 mr-3' /> wait...
      </div>
    );
  }

  if (filteredList && filteredList == null) {
    return (
      <div className='w-full py-32 flex items-center justify-center'>
        <CgLoadbar className='animate-spin w-6 h-6 mr-3' /> loading...
      </div>
    );
  }

  return (
    <>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 '>
        {filteredList &&
          filteredList?.map((list) => (
            <div
              key={list.id}
              className='relative p-7 bg-gradient-to-br from-gray-800 via-gray-800 to-sky-900 rounded-xl'>
              <h1 className='text-lg font-medium'>{list.fullname}</h1>
              <h3 className='font-light tracking-widest'>{list.course}</h3>
              <p className='text-sm text-gray-400'>{list.email}</p>
              <p className='text-sm text-gray-400'>{list.phone}</p>
              <Link
                href={`/dashboard/${list.id}`}
                className='absolute bottom-4 right-4'>
                <TbEdit className='w-6 h-6 text-sky-500' />
              </Link>
            </div>
          ))}
      </div>
      <div>{/* <PaginationComponent count={count}  /> */}</div>
    </>
  );
};

export default StudentCardList;
