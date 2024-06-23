"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LuAlignRight } from "react-icons/lu";
import { MdSettingsSuggest } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { TbHomeEdit, TbLayoutDashboard, TbUsersGroup } from "react-icons/tb";
import { Button } from "./ui/button";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  const menuList = [
    { id: 1, name: "Home", icon: TbHomeEdit, path: "/" },
    { id: 2, name: "Dashboard", icon: TbLayoutDashboard, path: "/dashboard" },
    { id: 3, name: "Students", icon: PiStudent, path: "/dashboard/students" },
    {
      id: 4,
      name: "Others",
      icon: TbUsersGroup,
      path: "/dashboard/attendance",
    },
    {
      id: 5,
      name: "Settings",
      icon: MdSettingsSuggest,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="sm:hidden">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={`transition duration-300 ease-in-out ${
            open ? "rotate-[360deg]" : ""
          }`}>
          {open ? (
            <IoMdClose className='text-2xl text-red-500' />
          ) : (
            <LuAlignRight className='text-2xl' />
          )}
        </PopoverTrigger>
        <PopoverContent className='mr-4 w-48'>
          <div className='flex flex-col items-start justify-center gap-4'>
            {menuList.map((list) => (
              <Button
                key={list.id}
                variant='ghost'
                asChild
                onClick={() => setOpen(false)}
                className='w-ful py-2 text-left'>
                <Link
                  href={list.path}
                  className='text-left flex justify-start items-center'>
                  <list.icon className='mr-3 shrink-0 w-6 h-6 text-sky-500' />{" "}
                  {list.name}
                </Link>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MobileMenu;
