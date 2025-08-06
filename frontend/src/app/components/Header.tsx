import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar } from "@radix-ui/react-avatar";
import { Lock, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  const user = {
    profilePicture: "",
    name: "",
    email : ""
  };

  const userPlaceholder = "";

  const handleLogin = () => {}

  const menuItems = [
    ...(user && user ? [
      {
        href: "account/profile",
        content: (
          <div className="flex space-x-4 items-center p-2 border-b">
            <Avatar className="w-12 h-12 -ml-2 rounded-full">
              {
                user?.profilePicture ? (
                  <AvatarImage alt="user_image"></AvatarImage>
                ) : (
                    <AvatarFallback>{userPlaceholder}</AvatarFallback>
                )
              }
            </Avatar>
              <div className="flex flex-col"></div>
            <span className="font-semibold text-md">
              {user.name}

            </span>
            <span className="text-xs text-gray-500">
              {user.email}
            </span>
          </div>
        )
      }
    ] : [{
      icon : <Lock className='h-5 w-5'/>,
      label: "Login.Sign up",
      onclick: handleLogin
      }]
  )
  ]

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container w-[80%] mx-auto hidden lg:flex item-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/web-logo.png"
            width={450}
            height={100}
            alt="desktop-logo"
            className="h-15 w-auto"
          />
        </Link>
        <div className="flex flex-1 items-center justify-center max-w-xl px-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Book name / Author / Publisher"
              className="w-full pr-10"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex item-center gap-4">
          <Link href="/book-sell">
            <Button className="bg-yellow-400 text-grey-900 hover:bg-yellow-500">
              Sell Used Book
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Avatar className="w-8 h-8 rounder-full">
                  {user?.profilePicture ? (
                    <AvatarImage alt="user_image"></AvatarImage>
                  ) : userPlaceholder ? (
                    <AvatarFallback>{userPlaceholder}</AvatarFallback>
                  ) : (
                    <User className="ml-2 mt-2" />
                  )}
                </Avatar>
                My Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-2">

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
13138