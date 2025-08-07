"use client";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toggleLoginDialog } from "@/store/slice/userSlice";
import { RootState } from "@/store/store";
import {
  ChevronRight,
  Heart,
  Lock,
  LogOut,
  Package,
  PiggyBank,
  Search,
  ShoppingCart,
  User,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const router = useRouter();
  const user = {
    profilePicture: "",
    name: "",
    email: "",
  };
  const dispatch = useDispatch();
  const isLoginOpen = useSelector((state: RootState) => state.user.isLoggedIn);
  const userPlaceholder = "";

  const handleLoginClick = () => {
    dispatch(toggleLoginDialog());
    setIsDropDownOpen(false);
  };

  const handleProtectionNavigation = (href: string) => {
    if (user) {
      router.push(href);
      setIsDropDownOpen(false);
    } else {
      dispatch(toggleLoginDialog());
      setIsDropDownOpen(false);
    }
  };

  const handleLogout = () => {};

  const menuItems = [
    ...(user && user
      ? [
          {
            href: "account/profile",
            content: (
              <div className="flex space-x-4 items-center p-2 border-b">
                <Avatar className="w-12 h-12 -ml-2 rounded-full">
                  {user?.profilePicture ? (
                    <AvatarImage alt="user_image"></AvatarImage>
                  ) : (
                    <AvatarFallback>{userPlaceholder}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col"></div>
                <span className="font-semibold text-md">{user.name}</span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
            ),
          },
        ]
      : [
          {
            icon: <Lock className="h-5 w-5" />,
            label: "Login/Sign Up",
            onclick: handleLoginClick,
          },
          {
            icon: <User className="h-5 w-5" />,
            label: "My Profile",
            onclick: () => handleProtectionNavigation("/account/profile"),
          },
          {
            icon: <Package className="h-5 w-5" />,
            label: "My Order",
            onclick: () => handleProtectionNavigation("/account/orders"),
          },
          {
            icon: <PiggyBank className="h-5 w-5" />,
            label: "My Selling Orders",
            onclick: () =>
              handleProtectionNavigation("/account/selling-products"),
          },
          {
            icon: <ShoppingCart className="h-5 w-5" />,
            label: "Cart",
            onclick: () => handleProtectionNavigation("/checkout/cart"),
          },
          {
            icon: <Heart className="h-5 w-5" />,
            label: "My Wishlist",
            onclick: () => handleProtectionNavigation("account/wishlist"),
          },
          {
            icon: <User2 className="h-5 w-5" />,
            label: "About US",
            href: "/about-us",
          },
          {
            icon: <User2 className="h-5 w-5" />,
            label: "Terms & Use",
            href: "/terms-of-use",
          },
          {
            icon: <User2 className="h-5 w-5" />,
            label: "Privacy Policy",
            href: "/privacy-policy",
          },
          {
            icon: <User2 className="h-5 w-5" />,
            label: "Help",
            href: "/how-it-works",
          },
          ...(user && [
            {
              icon: <LogOut className="h-5 w-5" />,
              label: "Logout",
              onclick: handleLogout,
            },
          ]),
        ]),
  ];

  const MenuItems = ({ classname = "" }) => (
    <div className={classname}>
      {menuItems?.map((item, index) =>
        item?.href ? (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 txt-sm rounded-lg hover:bg-gray-200"
            onClick={() => setIsDropDownOpen(false)}
          >
            {item.icon}
            <span>{item?.label}</span>
            {item?.content && <div className="mt-1">{item?.content}</div>}
            <ChevronRight className="2-4 h-4 ml-auto" />
          </Link>
        ) : (
          <button
            key={index}
            className="flex w-full items-center gap-3 px-4 py-3 txt-sm rounded-lg hover:bg-gray-200"
            onClick={item.onclick}
          >
            {item.icon}

            <span>{item?.label}</span>
            <ChevronRight className="2-4 h-4 ml-auto" />
          </button>
        )
      )}
    </div>
  );

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container w-[80%] mx-auto hidden lg:flex items-center justify-between p-4 gap-4">
        <Link
          href="/"
          className="flex-none inline-flex items-center w-auto max-w-fit"
        >
          <div style={{ width: 150 }}>
            <Image
              src="/images/web-logo.png"
              width={150}
              height={60}
              alt="desktop-logo"
              priority
              className="w-[150px] h-auto object-contain"
            />
          </div>
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
          <DropdownMenu
            open={isDropDownOpen}
            onOpenChange={(open) => setIsDropDownOpen(open)}
          >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Avatar className="w-8 h-8 rounded-full">
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
              <MenuItems />
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/checkout/cart">
            <div className="relative">
              <Button variant="ghost">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
              </Button>
              {user && (
                <span className="absolute top-2 left-5 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-1 text-xs">
                  3
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
