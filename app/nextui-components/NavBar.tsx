"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { BsGlobe } from "react-icons/bs";
import ModeSwitch from "./ModeSwitch";
import { CiSettings } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { RiSettings3Fill } from "react-icons/ri";
import { IoPersonOutline, IoSettingsSharp } from "react-icons/io5";
import { TokenService } from "../Services/StorageService";
import { usePathname, useRouter } from "next/navigation";
import { Donor } from "../interfaces/DonorInterface";
import DonorServices from "../Services/DonorServices";
import toast from "react-hot-toast";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const currentPath = usePathname();

  const menuItems = [
    {
      label: "Home",
      link: "/donor",
    },
    {
      label: "Donate",
      link: "/donor/donate",
    },
    {
      label: "My Donations",
      link: "/donor/my-donations",
    },
  ];

  const signOut = () => {
    TokenService.removeAccessToken();
    toast.success("Logged Out.");
    router.push("/auth/login");
  };

  const [userDetails, setUserDetails] = useState<Donor>();

  const getUserDetails = async () => {
    const res = await DonorServices.getDonorDetails();

    if (!res.status) {
      toast.error("Server Error.");
    }
    setUserDetails(res.data.data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="full" height={"4rem"}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
        <NavbarBrand className="gap-2">
          <BsGlobe className="h-8 w-8" />
          <p className="font-bold text-2xl text-inherit">Regift</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-10" justify="center">
        {menuItems.map((item) => (
          <NavbarItem isActive={currentPath === item.link} key={item.link}>
            <Link
              onClick={() => router.push(item.link)}
              className="cursor-pointer"
              color={currentPath === item.link ? "primary" : "foreground"}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="gap-2">
        <ModeSwitch />
        <Dropdown placement="bottom-end" backdrop="blur">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src={userDetails?.profileImg || ""}
              fallback={"?"}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{userDetails?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings" startContent={<IoSettingsSharp className="w-[15px] h-[15px]" />}>
              My Settings
            </DropdownItem>

            <DropdownItem
              key="profile"
              className="h-14 gap-2"
              startContent={<IoPersonOutline className="w-[15px] h-[15px]" />}
              onClick={() => router.push('/donor/profile')}
            >
              Profile
            </DropdownItem>

            <DropdownItem
              key="logout"
              color="danger"
              startContent={<MdLogout className="w-[15px] h-[15px]" />}
              onClick={() => signOut()}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.link} className="py-3">
            <Link
              color={item.link === currentPath ? "primary" : "foreground"}
              className="w-full"
              size="lg"
              onClick={() => router.push(item.link)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
