"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import AddNewStudentForm from "./AddNewStudentForm";
import { Button } from "./ui/button";

const AddNewStudent = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='border px-3 py-2 rounded-xl bg-gray-900 '>
        + Add Student
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AddNewStudentForm setOpenDialog={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddNewStudent;
