// "use client";

import CourseChart from "@/components/CourseCharts";
import { createClient } from "@/utils/supabase/server";
import { GiPublicSpeaker } from "react-icons/gi";
import { HiCode, HiOutlinePhotograph } from "react-icons/hi";
import { SiAntdesign } from "react-icons/si";

const ServiceTab = async () => {
  const supabase = createClient();

  const { count: totalCount } = await supabase
    .from("students")
    .select("id", { count: "exact" });

  const { count: softwareCount } = await supabase
    .from("students")
    .select("id", { count: "exact" })
    .eq("course", "Software Development");

  const { count: graphicCount } = await supabase
    .from("students")
    .select("id", { count: "exact" })
    .eq("course", "Graphic Design");

  const { count: photographyCount } = await supabase
    .from("students")
    .select("id", { count: "exact" })
    .eq("course", "Photography");

  const { count: publicSpeakingCount } = await supabase
    .from("students")
    .select("id", { count: "exact" })
    .eq("course", "Public Speaking");

  const totalCourse = totalCount || 0;
  const softwareCourse = softwareCount || 0;
  const graphicCourse = graphicCount || 0;
  const photographyCourse = photographyCount || 0;
  const publicSpeakingCourse = publicSpeakingCount || 0;

  const softwarePercent = parseFloat(
    ((softwareCourse / totalCourse) * 100).toFixed(2)
  );

  const graphicPercent = parseFloat(
    ((graphicCourse / totalCourse) * 100).toFixed(2)
  );

  const photographyPercent = parseFloat(
    ((photographyCourse / totalCourse) * 100).toFixed(2)
  );

  const publicSpeakingPercent = parseFloat(
    ((publicSpeakingCourse / totalCourse) * 100).toFixed(2)
  );

  const serviceTab = [
    {
      value: softwarePercent,
      title: "Software Development",
      //   icon: HiCode
    },
    {
      value: graphicPercent,
      title: "Graphic Design",
      //   icon: SiAntdesign
    },
    {
      value: photographyPercent,
      title: "Photography",
      //   icon: HiOutlinePhotograph,
    },
    {
      value: publicSpeakingPercent,
      title: "Public Speaking",
      //   icon: GiPublicSpeaker,
    },
  ];

  return (
    <div className='mt-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {serviceTab.map((x, index) => (
        <div key={index} className='flex flex-col items-center'>
          <div className='w-full flex flex-col items-center justify-center rounded-xl bg-gray-100 shadow-md hover:shadow-lg transition duration-500 ease-in-out hover:scale-105 dark:bg-gray-900 px-2 py-5'>
            {x.title === "Software Development" && (
              <HiCode className='w-12 h-12 mb-4 text-sky-500' />
            )}
            {x.title === "Graphic Design" && (
              <SiAntdesign className='w-12 h-12 mb-3 text-sky-500' />
            )}
            {x.title === "Photography" && (
              <HiOutlinePhotograph className='w-12 h-12 mb-3 text-sky-500' />
            )}
            {x.title === "Public Speaking" && (
              <GiPublicSpeaker className='w-12 h-12 mb-3 text-sky-500' />
            )}
            <CourseChart serviceTab={serviceTab} index={index} />
            <p className='text-center mt-3'>{x.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceTab;
