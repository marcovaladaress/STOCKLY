"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface ButtonSideBarProps{
    children:React.ReactNode
    href:string 
    onClick?: () => void
}

const ButtonSideBar = ({href, children, onClick}:ButtonSideBarProps) => {

    const pathname = usePathname()
    return (

        <Button variant={pathname === href ? "secondary" : "ghost"} className="w-full justify-start px-8 py-4 ">
        <Link href={`${href}`} className="flex items-center gap-1.5 w-full" onClick={onClick}>
        {children}
        </Link>
      </Button>
      );
}
 
export default ButtonSideBar;