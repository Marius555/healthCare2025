"use server"
import React from "react";
import Navbar from "./ui/navBar";
import { GetLoggedInUser } from "@/appwriteUtils/getCurrentUser";

const NavBarWrapper = async () => {
  const userResponse = await GetLoggedInUser();
  const isUser = userResponse?.success;
  
  return (
    <>
      <Navbar isUser={isUser} user={userResponse || null}/>
    </>
  );
};

export default NavBarWrapper;
