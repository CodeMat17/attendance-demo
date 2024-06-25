"use client";

import { useState } from "react";
import { Input } from "./ui/input";


type Props = {
  count: number | null;
  students:
    | {
        id: string;
        fullname: string;
        phone: string;
        email: string;
        course: string;
      }[]
    | null;
};

const StudentList = ({ students, count }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = students?.filter((student) => {
    const name = student.fullname.toLowerCase();
    const phoneNo = student.phone.toLowerCase();
    const course = student.course.toLowerCase();

    const searchTermLower = searchTerm.toLowerCase();
    return (
      name.includes(searchTermLower) ||
      phoneNo.includes(searchTermLower) ||
      course.includes(searchTermLower)
    );
  });

  return (
    <>
      <div className='w-full max-w-md mx-auto'>
        <Input
          type='search'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search students by name, course or phone no.'
        />
        {searchTerm && (
          <p className='text-center text-sm font-light mt-1 text-gray-400 uppercase'>
            {searchTerm}: {filteredList?.length}
          </p>
        )}
      </div>

      <div>
        {filteredList && filteredList!.length < 1 ? (
          <h1 className='text-center p-5 py-32'>No match found. Try again.</h1>
        ) : (
          <div className='mt-8 lg:px-4'>
            <StudentCardList filteredList={filteredList}  />
           
          </div>
        )}
      </div>
    </>
  );
};

export default StudentList;
