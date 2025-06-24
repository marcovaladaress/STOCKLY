"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface ButtonSideBarProps{
    children:React.ReactNode
    href:string 
}

const ButtonSideBar = ({href, children}:ButtonSideBarProps) => {

    const pathname = usePathname()
    return (

        <Button variant={pathname === href ? "secondary" : "ghost"} className="w-full justify-start px-8 py-4 ">
        <Link href={`${href}`} className="flex items-center gap-1.5 w-full">
        {children}
        </Link>
      </Button>
      );
}
 
export default ButtonSideBar;