import AddNewStudent from "@/components/AddNewStudent";
import StudentList from "@/components/StudentList";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 0;

const Students = async () => {
  const supabase = createClient();

  const { count } = await supabase
    .from("students")
    .select("id", { count: "exact", head: true });

  const { data: students, error } = await supabase
    .from("students")
    .select("id, fullname, phone, email, course")
    .order("fullname", { ascending: true });

  return (
    <>
      <div className='sticky top-0 z-40 flex items-center justify-between gap-4 px-4 py-3 dark:border-b dark:border-gray-900 shadow-md bg-inherit backdrop:filter backdrop-blur-md'>
        <section>
          <h2 className='text-2xl font-bold'>Students</h2>
          <p className='text-sm text-gray-500'>
            Total number of students: {count}
          </p>
          {/* <div className="flex flex-wrap gap-3">
            <p className='text-sm text-gray-500'>
              Software Dev.: {count}
            </p>
            <p className='text-sm text-gray-500'>
              Graphic Designs: {count}
            </p>
            <p className='text-sm text-gray-500'>
              Photography: {count}
            </p>
            <p className='text-sm text-gray-500'>
              Public Speaking: {count}
            </p>
            <p className='text-sm text-gray-500'>
              Others: {0}
            </p>
          </div> */}
        </section>
        <AddNewStudent />
      </div>

      <div className='px-4 pt-8 py-12'>
        <StudentList students={students} count={count} />
      </div>
    </>
  );
};

export default Students;
