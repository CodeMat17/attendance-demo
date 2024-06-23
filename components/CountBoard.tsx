import { createClient } from "@/utils/supabase/server";

const CountBoard = async () => {
  const Supabase = createClient();

  const { count: sd } = await Supabase.from("students")
    .select("id", { count: "exact" })
    .eq("course", "Software Development");

  const { count: gd } = await Supabase.from("students")
    .select("id", { count: "exact" })
    .eq("course", "Graphic Design");

  const { count: ph } = await Supabase.from("students")
    .select("id", { count: "exact" })
    .eq("course", "Photography");

  const { count: ps } = await Supabase.from("students")
    .select("id", { count: "exact" })
    .eq("course", "Public Speaking");

  return (
    <div className='p-4 flex flex-wrap justify-center gap-x-4 text-sm leading-tight text-gray-400'>
      <p>Software Development: {sd} </p>
      <p>|</p>
      <p>Photography: {ph}</p>
      <p>|</p>
      <p>Graphic Design: {gd} </p>
      <p>|</p>
      <p>Public Speaking: {ps}</p>
    </div>
  );
};

export default CountBoard;
