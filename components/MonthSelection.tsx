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
import { useEffect, useState } from "react";

type Props = {
  setSelectedDate: (value: Date) => void;
};

const MonthSelection = ({ setSelectedDate }: Props) => {
  const today = new Date();
  const nextMonths = addMonths(today, 0);
  const [month, setMonth] = useState(nextMonths);

  const [date, setDate] = useState<Date | undefined>(today);

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
    }
  }, [date, setSelectedDate]);

  return (
    <Popover>
      <PopoverTrigger className='flex items-center  rounded-xl py-2 px-3 bg-gradient-to-br from-sky-600 hover:from-sky-500 transition duration-500 ease-in-out'>
        <CgCalendarDates className='hidden sm:block w-5 h-5 mr-2' />
        {dayjs(date).format("DD MMM, YYYY")}
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
