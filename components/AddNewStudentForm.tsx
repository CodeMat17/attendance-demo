"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";
import { CgSpinnerAlt } from "react-icons/cg";
import { toast } from "sonner";

// import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// const phoneRegex = /^\+?[1-9]\d{1,14}$/;

const formSchema = z.object({
  fullname: z.string().min(4, {
    message: "Full name must be at least 4 characters.",
  }),
  course: z.string().min(4, {
    message: "Select a course.",
  }),
  phone: z.string().length(11, {
    message: "Phone number must be exactly 11 digits.",
  }),
  email: z
    .string({
      required_error: "Please enter a valid email.",
    })
    .email(),
});

const AddNewStudentForm = ({
  setOpenDialog,
}: {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      course: "",
      phone: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("students")
        .insert([values])
        .select();

      if (error) {
        if (error.code === "23505") {
          setErrorMessage(error.details);
        } else {
          setErrorMessage("Something went wrong. Try again later.");
        }

        console.log("ErrorCode", error.code);
      }

      if (data) {
        // console.log("DATA: ", data[0]);
        // console.log("DATA_ID: ", data[0].id);
        const { data: attendanceData, error: attendanceError } = await supabase
          .from("attendance")
          .insert([{ student_id: data[0].id }]);

        if (attendanceError) {
          await supabase.from("students").delete().eq("id", data[0].id);
          toast.error("something went wrong (poor internet), try again.");
        }

        if (!attendanceError) {
          router.refresh();
          toast("Student added successfully.");
          setOpenDialog(false);
        }
      }
    } catch (error) {
      console.log("Error Msg: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      {errorMsg && (
        <p className='text-center text-sm p-2 bg-red-100 text-red-500 rounded-lg'>
          {errorMsg}
        </p>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='fullname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Ex. Michael West'
                  {...field}
                  className='my-0'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='course'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='py-0'>Course</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Ex. Software Development' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='Software Development'>
                      Software Development
                    </SelectItem>
                    <SelectItem value='Photography'>Photography</SelectItem>
                    <SelectItem value='Graphic Design'>
                      Graphic Design
                    </SelectItem>
                    <SelectItem value='Public Speaking'>
                      Public Speaking
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone no.</FormLabel>
              <FormControl>
                <Input placeholder='Ex. 08012345678' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Ex. student@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-between pt-8'>
          <Button
            onClick={() => setOpenDialog(false)}
            className='dark:text-gray-300 dark:bg-gray-700'>
            Close
          </Button>
          <Button
            type='submit'
            variant='outline'
            className='dark:text-green-500 border-green-500'>
            {loading ? (
              <CgSpinnerAlt className='animate-spin w-6 h-6' />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddNewStudentForm;
