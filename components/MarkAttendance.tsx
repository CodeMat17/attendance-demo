"use client";

import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { CgLoadbar } from "react-icons/cg";
import { toast } from "sonner";
import ClassSelection from "./ClassSelection";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

const MarkAttendance = ({ id }: { id: string }) => {
  const supabase = createClient();

  const [loadingAttendance, setLoadingAttendance] = useState(true);
  const [loading, setLoading] = useState(false);
  const [unmarkLoading, setUnmarkLoading] = useState(false);
  const [class_1, setClass1] = useState(null);
  const [class_2, setClass2] = useState(null);
  const [class_3, setClass3] = useState(null);
  const [class_4, setClass4] = useState(null);
  const [class_5, setClass5] = useState(null);
  const [class_6, setClass6] = useState(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [attendance_date, setAttendanceDate] = useState(
    selectedDate?.toISOString()
  );

  const [selectedClass, setSelectedClass] = useState("");

  const [status, setStatus] = useState("done");

  const handleSetSelectedDate = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected Date...:", date.toISOString());
  };

  // const attendance_date = selectedDate?.toISOString();
  // console.log("CLASS: ", selectedClass);

  const updates: { [key: string]: string | Date } = {
    [selectedClass]: status,
    // attendance_date,
  };

  const unmarkUpdates: { [key: string]: string } = {
    [selectedClass]: "",
    // attendance_date,
  };

  const getAttendance = useCallback(async () => {
    try {
      setLoadingAttendance(true);

      const {
        data: attendance,
        error,
        status,
      } = await supabase
        .from("attendance")
        .select("*")
        .eq("student_id", id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (attendance) {
        setClass1(attendance.class_1);
        setClass2(attendance.class_2);
        setClass3(attendance.class_3);
        setClass4(attendance.class_4);
        setClass5(attendance.class_5);
        setClass6(attendance.class_6);
        setAttendanceDate(attendance.attendance_date);
      }
    } catch (error) {
      alert("Error loading student attendance");
    } finally {
      setLoadingAttendance(false);
    }
  }, [id, supabase]);

  useEffect(() => {
    getAttendance();
  }, [id, getAttendance]);


  const markAttendance = async () => {
    if (selectedClass) {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("attendance")
          .update(updates)
          .eq("student_id", id)
          .select();

        if (error) {
          toast.error(error.message);
        }
        if (data) {
          getAttendance();
          toast(`Attendance for ${selectedClass} updated successfully`);
        }
      } catch (error) {
        console.log("ErrorMsg: ", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast("You have not selected a class for your operation.");
    }
  };

  const unMarkAttendance = async () => {
    if (selectedClass) {
      try {
        setUnmarkLoading(true);

        const { data, error } = await supabase
          .from("attendance")
          .update(unmarkUpdates)
          .eq("student_id", id)
          .select();

        if (error) {
          toast.error(error.message);
        }
        if (data) {
          getAttendance();
          toast(`Attendance for ${selectedClass} updated successfully`);
        }
      } catch (error) {
        console.log("ErrorMsg: ", error);
      } finally {
        setUnmarkLoading(false);
      }
    } else {
      toast("You have not selected a class for your operation.");
    }
  };

  return (
    <div className='py-5'>
      <div className='flex items-center justify-center gap-2 sm:gap-4 w-full  max-w-xl mx-auto'>
        <ClassSelection setSelectedClass={setSelectedClass} />

        {/* <MonthSelection setSelectedDate={handleSetSelectedDate} /> */}
        <Button
          onClick={markAttendance}
          disabled={loading}
          className='py-5 px-6 w-[100px] sm:px-6 rounded-xl bg-gradient-to-br from-sky-500 hover:from-gray-700 hover:via-sky-950 hover:to-sky-700 via-sky-950 to-gray-900 to-90% transition duration-500 ease-in-out dark:text-white'>
          {loading ? <CgLoadbar className='animate-spin' /> : "Mark"}
        </Button>
        <Button
          onClick={unMarkAttendance}
          disabled={loading}
          className='py-5 px-6 w-[100px] sm:px-6 rounded-xl bg-gradient-to-br from-sky-600 hover:from-gray-700 hover:via-sky-950 hover:to-sky-700 via-sky-950 to-red-900 to-90% transition duration-500 ease-in-out dark:text-white'>
          {unmarkLoading ? <CgLoadbar className='animate-spin' /> : "Unmark"}
        </Button>
      </div>

      <>
        {loadingAttendance ? (
          <div className='w-full flex justify-center py-24'>
            <CgLoadbar className='animate-spin w-5 h-5 mr-3' /> loading
            attendance...
          </div>
        ) : (
          <div className='grid grid-cols-3 gap-2 sm:gap-4 place-items-center mt-8'>
            <div className='border rounded-xl w-full p-3 sm:p-7'>
              <p className='text-center text-lg font-medium'>Week 1</p>
              <div className=' mt-3 flex flex-col lg:flex-row gap-2 md:gap-4 items-center justify-center'>
                <div className='flex items-center space-x-2'>
                  {class_1 ? (
                    <Checkbox id='terms' checked disabled />
                  ) : (
                    <Checkbox id='terms' disabled />
                  )}

                  <label
                    htmlFor='terms'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    Class 1
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  {class_2 ? (
                    <Checkbox id='terms' checked disabled />
                  ) : (
                    <Checkbox id='terms' disabled />
                  )}
                  <label
                    htmlFor='terms'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    Class 2
                  </label>
                </div>
              </div>
            </div>
            <div className='border rounded-xl w-full p-3 sm:p-7'>
              <p className='text-center text-lg font-medium'>Week 2</p>
              <div className=' mt-3 flex flex-col lg:flex-row gap-2 md:gap-4 items-center justify-center'>
                <div className='flex items-center space-x-2'>
                  {class_3 ? (
                    <Checkbox id='terms' checked disabled />
                  ) : (
                    <Checkbox id='terms' disabled />
                  )}
                  <label
                    htmlFor='terms'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    Class 3
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  {class_4 ? (
                    <Checkbox id='terms' checked disabled />
                  ) : (
                    <Checkbox id='terms' disabled />
                  )}
                  <label
                    htmlFor='terms'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    Class 4
                  </label>
                </div>
              </div>
            </div>
            <div className='border rounded-xl w-full p-3 sm:p-7'>
              <p className='text-center text-lg font-medium'>Week 3</p>
              <div className=' mt-3 flex flex-col lg:flex-row gap-2 md:gap-4 items-center justify-center'>
                <div className='flex items-center space-x-2'>
                  {class_5 ? (
                    <Checkbox id='terms' checked disabled />
                  ) : (
                    <Checkbox id='terms' disabled />
                  )}
                  <label
                    htmlFor='terms'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    Class 5
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  {class_6 ? (
                    <Checkbox id='terms' checked disabled />
                  ) : (
                    <Checkbox id='terms' disabled />
                  )}
                  <label
                    htmlFor='terms'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    Class 6
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default MarkAttendance;
