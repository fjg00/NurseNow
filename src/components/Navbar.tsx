"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Stethoscope,
  User,
  UserCog,
  ShieldCheck,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const dashboardLinks = [
  { href: "/patient/dashboard", label: "Patient", icon: User },
  { href: "/nurse/dashboard", label: "Nurse", icon: UserCog },
  { href: "/admin/dashboard", label: "Admin", icon: ShieldCheck },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Stethoscope className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-primary">NurseNow</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {dashboardLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <link.icon className="h-4 w-4" />
                {link.label}
              </Button>
            </Link>
          ))}
          <Link href="/login">
            <Button size="sm">Sign In</Button>
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <Stethoscope className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-primary">
                  NurseNow
                </span>
              </Link>
            </div>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-border" />
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                Dashboards
              </p>
              {dashboardLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-border" />
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button className="w-full">Sign In</Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
