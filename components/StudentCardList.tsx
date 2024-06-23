import Link from "next/link";
import { useState } from "react";
import { CgLoadbar } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import DeleteStudent from "./modals/DeleteStudent";

export const revalidate = 0

type Props = {
  // count: number | null;
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

const StudentCardList = ({ filteredList }: Props) => {


  return (
    <>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 '>
        {filteredList &&
          filteredList?.map((list) => (
            <div
              key={list.id}
              className='relative p-7 bg-gradient-to-br from-gray-800 via-gray-800 to-sky-900 rounded-xl overflow-hidden border-4 border-inherit transition duration-700 ease-in-out hover:border-sky-700'>
              <h1 className='text-lg font-medium'>{list.fullname}</h1>
              <h3 className='font-light tracking-widest'>{list.course}</h3>
              <p className='text-sm text-gray-400'>{list.email}</p>
              <p className='text-sm text-gray-400'>{list.phone}</p>

              <div className='absolute bottom-2 right-2 border flex items-center gap-4 px-2 py-1 rounded-xl bg-sky-950/20 hover:shadow-lg hover:bg-sky-950'>
                <DeleteStudent id={list.id} name={list.fullname} />

                <Link href={`/dashboard/${list.id}`}>
                  <TbEdit className='w-6 h-6 text-sky-400 hover:text-sky-600' />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default StudentCardList;
