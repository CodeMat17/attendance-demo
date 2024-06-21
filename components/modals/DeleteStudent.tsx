"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgLoadbar } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";
import { Button } from "../ui/button";

const DeleteStudent = ({ id, name }: { id: string; name: string }) => {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteStudent = async () => {
    const { error } = await supabase.from("students").delete().eq("id", id);

    if (error) {
      toast.error("Something went wrong");
    }
    if (!error) {
      toast.success("Student deleted successfully");
      router.refresh();
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <RiDeleteBin6Line className='w-5 h-5 text-red-400 hover:text-red-600' />
      </PopoverTrigger>

      <PopoverContent className='text-center mr-4'>
        <p>Are you sure you want to delete</p>
        <p className='mb-3'>{name} ?</p>
        <Button
          onClick={deleteStudent}
          disabled={loading}
          className='disabled:cursor-not-allowed'>
          {" "}
          {loading ? <CgLoadbar className='animate-spin' /> : "Delete"}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteStudent;
