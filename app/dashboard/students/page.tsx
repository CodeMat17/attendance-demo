import CountBoard from "@/components/CountBoard";
import StudentListComponent from "@/components/StudentListComponent";
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
  // .range(0, 4);

  return (
    <>
      <StudentListComponent />

      <CountBoard />
    </>
  );
};

export default Students;
