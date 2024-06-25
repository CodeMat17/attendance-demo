"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgLoadbar, CgSearch } from "react-icons/cg";
import { TbChevronLeft, TbChevronRight, TbEdit } from "react-icons/tb";
import AddNewStudent from "./AddNewStudent";
import DeleteStudent from "./modals/DeleteStudent";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Student = {
  id: string;
  fullname: string;
  course: string;
  phone: string;
  email: string;
};

const StudentListComponent = () => {
  const supabase = createClient();

  const [students, setStudents] = useState<Student[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [noMatchFound, setNoMatchFound] = useState<boolean>(false);

  useEffect(() => {
    fetchStudents();
  }, [page, searchQuery]);

  const fetchStudents = async () => {
    setLoading(true);
    const perPage = 9;
    const from = page * perPage;
    const to = from + perPage - 1;

    let query = supabase
      .from("students")
      .select("*", { count: "exact" })
      .order("fullname")
      .range(from, to);

    if (searchQuery) {
      query = supabase
        .from("students")
        .select("*", { count: "exact" })
        .or(`fullname.ilike.%${searchQuery}%,course.ilike.%${searchQuery}%`)
        .order("fullname")
        .range(from, to);
    }

    const { data, count, error } = await query;

    if (error) {
      console.error("Error fetching students:", error);
    } else {
      setStudents(data || []);
      setTotalPages(Math.ceil((count || 0) / perPage));
      setNoMatchFound(data?.length === 0);
      setTotalCount(count || 0);
    }

    setLoading(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0); // Reset to first page on new search
  };

  return (
    <>
      <div className='px-4 py-3 border-b sticky top-0 z-40 flex justify-between items-center bg-white/30 dark:bg-gray-950/30 backdrop-filter backdrop-blur-md'>
        <div className=''>
          <h1 className='text-2xl font-bold'>Students</h1>
          <p className='text-sm text-gray-500'>
            Total number of students: {totalCount}
          </p>
        </div>
        <AddNewStudent fetchStudents={fetchStudents} />
      </div>

      <div className='max-w-5xl mx-auto p-4'>
        <div className='relative w-full max-w-md mx-auto'>
          <Input
            type='search'
            placeholder='Search students by name or by course...'
            value={searchQuery}
            onChange={handleSearchChange}
            className='mb-4 pl-10 py-2 pb-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 '
          />
          <CgSearch className='absolute top-2.5 w-5 h-5 ml-3 text-sky-600' />
        </div>

        {loading ? (
          <div className='w-full flex justify-center py-32'>
            <CgLoadbar className='animate-spin w-5 h-5 mr-4' /> loading...
          </div>
        ) : (
          <div>
            {noMatchFound ? (
              <h1 className='text-center p-5 py-32'>
                No match found. Try again.
              </h1>
            ) : (
              <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 mt-12'>
                {students.map((student) => (
                  <div
                    key={student.id}
                    className='relative p-7 bg-gradient-to-br from-gray-100 dark:from-gray-800 dark:via-gray-800 to-gray-100 dark:to-sky-900 rounded-xl overflow-hidden border-4 border-inherit transition duration-700 ease-in-out hover:border-sky-700'>
                    <h1 className='text-lg font-medium'>{student.fullname}</h1>
                    <h3 className='font-light tracking-widest'>
                      {student.course}
                    </h3>
                    <p className='text-sm text-gray-400'>{student.email}</p>
                    <p className='text-sm text-gray-400'>{student.phone}</p>

                    <div className='absolute bottom-2 right-2 border flex items-center gap-4 px-2 py-1 rounded-xl bg-white/50 dark:bg-sky-950/20 hover:shadow-md hover:bg-gray-200 dark:hover:bg-sky-950'>
                      <DeleteStudent
                        id={student.id}
                        name={student.fullname}
                        fetchStudents={fetchStudents}
                      />

                      <Link href={`/dashboard/students/${student.id}`}>
                        <TbEdit className='w-6 h-6 text-sky-400 hover:text-sky-600' />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className='my-7'>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant='ghost'
                      onClick={() => setPage(page - 1)}
                      disabled={page === 0}>
                      <TbChevronLeft className='mr-2' /> Previous
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <span className='text-sm'>
                      Page {page + 1} of {totalPages}
                    </span>
                  </PaginationItem>

                  <PaginationItem>
                    <Button
                      variant='ghost'
                      onClick={() => setPage(page + 1)}
                      disabled={page >= totalPages - 1}>
                      Next <TbChevronRight className='ml-2' />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentListComponent;
