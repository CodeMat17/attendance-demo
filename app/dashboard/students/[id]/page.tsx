import MarkAttendance from "@/components/MarkAttendance";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

export const revalidate = 0;

type Props = {
  params: {
    id: string;
  };
};

const StudentPage = async ({ params: { id } }: Props) => {

 const user = await currentUser();

 if (user?.publicMetadata.role !== "admin") {
   return (
     <div className='w-full h-[30rem] flex justify-center py-32 tracking-widest'>
       You are not an admin.
     </div>
   );
 }

  const supabase = createClient();

  const { data: student, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  if (!student || error) {
    notFound();
    return null;
  }

  return (
    <div className='px-4 py-8 md:px-8 w-full min-h-screen max-w-4xl mx-auto'>
      <div>
        <h1 className='text-4xl md:text-5xl font-semibold text-center'>
          {student.fullname}
        </h1>
        <p className='text-center text-lg text-gray-400'>{student.email}</p>
        <p className='text-center text-lg text-gray-400'>{student.phone}</p>
        <p className='text-center text-xl font-medium mt-2 uppercase tracking-widest text-gray-400'>
          {student.course}
        </p>
      </div>
      <div className='mt-12'>
        <p className='text-center text-xl uppercase text-sky-600'>
          Mark Attendance
        </p>

        <MarkAttendance id={student.id} />
      </div>
    </div>
  );
};

export default StudentPage;
