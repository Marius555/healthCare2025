"use client";
import Link from "next/link";
import { useState } from "react";
import UserDropDown from "../userDropDown";
import { Button } from "./button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBarUserSection = ({ isUser, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isUser ? (
        <UserDropDown user={user} />
      ) : (
        <>
          {/* Display on larger screens */}
          <div className="hidden md:flex space-x-4">
            <Button asChild className="px-4 py-2 dark:bg-black bg-primary dark:text-white text-black rounded-md">
              <Link href="/login">Login</Link>
            </Button>

            <Button
              asChild
              className="px-4 py-2 bg-secondary text-white hover:text-gray-400 rounded-md hover:bg-forground"
            >
              <Link href="/registration">Sign Up</Link>
            </Button>
          </div>

          {/* Hamburger menu for small screens */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/login" className="w-full">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/registration" className="w-full">Sign Up</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </>
  );
};

export default NavBarUserSection;