"use client";

import React from "react";
import Link from "next/link";
import {
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
  Navbar,
} from "@heroui/navbar";

import { ThemeSwitch } from "./theme-switch";

import { usePathname } from "next/navigation";

export const NavbarMeme = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Table View", href: "/table" },
    { label: "Cards View", href: "/list" },
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map(({ label, href }) => (
          <NavbarItem key={href} isActive={pathname === href}>
            <Link
              aria-current={pathname === href ? "page" : undefined}
              href={href}
            >
              {label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <ThemeSwitch />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map(({ label, href }) => (
          <NavbarMenuItem key={href} isActive={pathname === href}>
            <Link
              className="w-full"
              href={href}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
