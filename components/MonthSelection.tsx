"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CgCalendarDates } from "react-icons/cg";

import { addMonths } from "date-fns";
import dayjs from "dayjs";
import { useState } from "react";

const MonthSelection = () => {
  const today = new Date();
  const nextMonths = addMonths(today, 0);
  const [month, setMonth] = useState(nextMonths);

    const [date, setDate] = useState<Date | undefined>(today);
    console.log("DATE: ", date);

  return (
    <Popover>
      <PopoverTrigger className='flex items-center  rounded-xl py-2 px-3 bg-gradient-to-br from-sky-600 hover:from-sky-500 transition duration-500 '>
        <CgCalendarDates className='w-5 h-5 mr-2' />
        {dayjs(month).format("MMM YYYY")}
      </PopoverTrigger>
      <PopoverContent className='mr-4'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          className='flex flex-1 justify-center items-center'
        />
      </PopoverContent>
    </Popover>
  );
};

export default MonthSelection;
