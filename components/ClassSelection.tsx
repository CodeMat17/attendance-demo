'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  setSelectedClass: (value: string) => void;
};

const ClassSelection = ({ setSelectedClass }: Props) => {
  return (
    <Select onValueChange={(value) => setSelectedClass(value)}>
      <SelectTrigger className='w-[140px] py-5 rounded-xl border-0 bg-gradient-to-br from-sky-600 hover:from-sky-500 transition duration-500 ease-in-out'>
        <SelectValue placeholder='Class' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='class_1'>Class 1</SelectItem>
        <SelectItem value='class_2'>Class 2</SelectItem>
        <SelectItem value='class_3'>Class 3</SelectItem>
        <SelectItem value='class_4'>Class 4</SelectItem>
        <SelectItem value='class_5'>Class 5</SelectItem>
        <SelectItem value='class_6'>Class 6</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ClassSelection;
