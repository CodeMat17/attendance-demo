"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useState } from "react";
import { Input } from "./ui/input";

type Props = {
  students:
    | {
        id: string;
        fullname: string;
        phone: string;
        email: string;
        course: string;
      }[]
  | null
};

const StudentList = ({ students }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = students?.filter((student) => {
    const name = student.fullname.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return name.includes(searchTermLower);
    // coop.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className='w-full max-w-md mx-auto'>
        <Input
          type='search'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search students'
        />
      </div>

      <div>
        {filteredList!.length < 1 ? (
          <h1 className='text-center p-5 py-32'>No match found. Try again.</h1>
        ) : (
          <div className='mt-6'>
            <Table>
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader>
                <TableRow>
                  <TableHead className='min-w-[180px]'>Full Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className=''>Phone no.</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredList?.map((list) => (
                  <TableRow key={list.id}>
                    <Link href='/dashboard'>
                      <TableCell>{list.fullname} Anthony Chukwu</TableCell>
                    </Link>
                    <TableCell>{list.course}</TableCell>
                    <TableCell>{list.email}</TableCell>
                    <TableCell>{list.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className='text-right'>$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentList;
