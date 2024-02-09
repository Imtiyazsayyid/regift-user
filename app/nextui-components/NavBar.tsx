"use client";

import React from "react";
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
} from "@nextui-org/react";
import { BsGlobe } from "react-icons/bs";
import ModeSwitch from "./ModeSwitch";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="full" height={"4rem"}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
        <NavbarBrand>
          <BsGlobe className="mr-1" />
          <p className="font-bold text-inherit">Regift</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-10" justify="center">
        <NavbarItem isActive>
          <Link href="/donor">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/donations">
            Donate
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/my-donations" color="foreground">
            My Donations
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/contact" color="foreground">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-2">
        <ModeSwitch />
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat" radius="sm">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="solid" radius="sm">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"}
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
