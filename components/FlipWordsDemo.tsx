import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "./ui/button";

export function FlipWordsDemo() {
  const words = [
    "Software-Development,",
    "Graphic-Design,",
    "Photography,",
    "and",
    "Public-Speaking,",
  ];

  return (
    <div className='h-[30rem] flex justify-center items-center px-4 lg:pl-8'>
      <div className='text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400'>
        <div className='mb-12'>
          This is an <span className='text-sky-500 '>ONLINE REGISTER</span> for
          our <span className='text-sky-500 '>online school</span>.
        </div>
        <div>Enroll today to study the following courses:</div>
        <br/>
        <FlipWords words={words} /> <br />
        {/* websites with Aceternity UI */}
        {/* <div className='flex justify-start mt-10 '>
          <Button className='px-8 dark:bg-sky-500 dark:text-white'>
            Start
          </Button>
        </div> */}
      </div>
    </div>
  );
}
