"use client";


import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdSettingsSuggest } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { TbHomeEdit, TbLayoutDashboard, TbUsersGroup } from "react-icons/tb";
import { Button } from "./ui/button";

const SideNav = () => {
  const pathname = usePathname();
  // console.log("pathname: ", pathname);
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
    <div className='shadow-md border border-gray-100 dark:border-gray-800 h-screen p-4'>
      <div className='flex justify-center'>
        <Image
          alt='logo'
          priority
          width={80}
          height={80}
          src='/logo_icon.png'
          className='rounded-[5px] overflow-hidden md:hidden'
        />
        <Image
          alt='logo'
          priority
          width={180}
          height={50}
          src='/logo.png'
          className='rounded-[5px] overflow-hidden hidden md:block'
        />
      </div>
      <hr className='my-12  border-gray-100 dark:border-gray-800' />

      {menuList.map((list) => (
        <Button
          asChild
          variant='ghost'
          key={list.id}
          className={`p-5 text-slate-500 rounded-xl w-full flex justify-start hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white my-2 ${
            pathname == list.path && "border-r-4 border-sky-500 text-sky-500"
          }`}>
          <Link
            href={list.path}
            className='flex justify-center md:justify-start gap-3'>
            <list.icon className='w-7 h-7 md:w-6 md:h-6' />
            <p className='hidden md:flex'>{list.name}</p>
          </Link>
        </Button>
      ))}

      <div className='fixed bottom-5 p-4 text-xs'>
       User details
      </div>
    </div>
  );
};

export default SideNav;
