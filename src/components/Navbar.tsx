"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-lg backdrop-blur-md top-0 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a
          href="#"
          className="text-2xl font-bold mb-4 md:mb-2 tracking-tighter"
        >
          Mystry Message
        </a>
        {session ? (
          <>
            <span className="mr-4 mb-2">
              {" "}
              Welcome,{" "}
              <span className="font-bold">
                {" "}
                {user?.username || user?.email}{" "}
              </span>{" "}
            </span>
            <Button
              className="w-full md:w-auto cursor-pointer"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Link href="/sign-in" className="cursor-pointer">
            <Button className="w-full md:w-auto ">Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
