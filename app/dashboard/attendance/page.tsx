"use client";

import MonthSelection from "@/components/MonthSelection";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { addMonths } from "date-fns";
import dayjs from "dayjs";
import { useState } from "react";
import { CgCalendarDates } from "react-icons/cg";

const Attendance = () => {
  const today = new Date();
  const nextMonths = addMonths(today, 0);

    const [month, setMonth] = useState(nextMonths);
    const [selectedMonth, setSelectedMonth] = useState();

  return (
    <>
      {" "}
      <div className='sticky top-0 z-40 flex items-center justify-between gap-4 px-4 py-3 dark:border-b dark:border-gray-900 shadow-md bg-inherit backdrop:filter backdrop-blur-md'>
        <section>
          <h2 className='text-2xl font-bold'>Attendance</h2>
          {/* <p className='text-sm text-gray-500'>
            Total number of students: {count}
          </p> */}
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
     <MonthSelection  />
      </div>
    </>
  );
};

export default Attendance;
