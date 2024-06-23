import ServiceTab from "@/components/ServiceTab";
import { createClient } from "@/utils/supabase/server";
import { GiPublicSpeaker } from "react-icons/gi";
import { HiCode, HiOutlinePhotograph } from "react-icons/hi";
import { PiStudent } from "react-icons/pi";
import { SiAntdesign } from "react-icons/si";

const Dashboard = async () => {
  const Supabase = createClient();

  const { data: students } = await Supabase.from("students").select("course");

  const softwareDevelopment = students?.filter(
    (student) => student.course === "Software Development"
  ).length;

  const publicSpeaking = students?.filter(
    (student) => student.course === "Public Speaking"
  ).length;

  const graphicDesign = students?.filter(
    (student) => student.course === "Graphic Design"
  ).length;

  const photography = students?.filter(
    (student) => student.course === "Photography"
  ).length;

  const totalStudents = students?.length || 0;
  const softwareCourse = softwareDevelopment || 0;
  const photographyCourse = photography || 0;
  const graphicDesignCourse = graphicDesign || 0;
  const PublicSpeakingCourse = publicSpeaking || 0;

  const softwarePercent = (softwareCourse / totalStudents) * 100;

  const photographyPercent = (photographyCourse / totalStudents) * 100;

  const graphicPercent = (graphicDesignCourse / totalStudents) * 100;
  const publicSpeakingPercent = (PublicSpeakingCourse / totalStudents) * 100;

  const count = [
    {
      id: 1,
      tag: "Software Development",
      count: softwareDevelopment,
      percent: softwarePercent,
      icon: HiCode,
    },
    {
      id: 2,
      tag: "Graphic Design",
      count: graphicDesign,
      percent: graphicPercent,
      icon: SiAntdesign,
    },
    {
      id: 3,
      tag: "Photography",
      count: photography,
      percent: photographyPercent,
      icon: HiOutlinePhotograph,
    },
    {
      id: 4,
      tag: "Public Speaking",
      count: publicSpeaking,
      percent: publicSpeakingPercent,
      icon: GiPublicSpeaker,
    },
  ];



  return (
    <div className='w-full px-4 py-5'>
      <h1 className='text-3xl font-semibold'>Dashboard</h1>
      <div className='mt-6 p-10 lg:p-5 bg-gradient-to-br from-sky-950 via-sky-800 to-sky-400 rounded-xl max-w-sm flex gap-4'>
        <PiStudent className='w-16 h-16 shrink-0 text-white' />
        <h2 className='text-xl text-white'>
          Total number of registered students: {students?.length}
        </h2>
      </div>
      {/* <div className='mt-6 font-medium text-lg'>
        <h2>Count per course:</h2>
        <div className='mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {count.map((item) => (
            <div
              key={item.id}
              className='bg-gray-900 p-5 rounded-xl space-y-3 flex flex-col justify-center items-center gap-'>
              <item.icon className='w-10 h-10 shrink-0 text-sky-500' />
              <div className='text-center text-[16px]'>
                <p className=''>
                  {item.tag}: {item.count}
                </p>
                <p className='text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-amber-500'>
                  {item.percent}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <div className='mt-6 font-medium text-lg'>
        <h2>Registration stat:</h2>
        <ServiceTab />
      </div>
    </div>
  );
};

export default Dashboard;
