import StudentListComponent from "@/components/StudentListComponent";
import { auth, currentUser } from "@clerk/nextjs/server";

import { createClient } from "@/utils/supabase/server";

export const revalidate = 0;

const Students = async () => {

  const user = await currentUser();

  if (user?.publicMetadata.role !== "admin") {
    return (
      <div className='w-full h-[30rem] flex justify-center py-32 tracking-widest'>
        You are not an admin.
      </div>
    );
  }

  // const supabase = createClient();

  // const { count } = await supabase
  //   .from("students")
  //   .select("id", { count: "exact", head: true });

  // const { data: students, error } = await supabase
  //   .from("students")
  //   .select("id, fullname, phone, email, course")
  //   .order("fullname", { ascending: true });
 

  return <StudentListComponent />;
};

export default Students;
