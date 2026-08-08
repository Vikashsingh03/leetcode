"use client";

import { useEffect, useState } from "react";
import { UserRole } from "@/lib/generated/prisma/enums";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/problems", label: "Problems" },
  { href: "/about", label: "About" },
  { href: "/profile", label: "Profile" },
];

export const Navbar = ({ userRole }: { userRole: UserRole | null }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out",
        "![font-family:var(--font-fredoka)]",
        mounted ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
        scrolled ? "pt-3" : "pt-6",
      ].join(" ")}
    >
      <div
        className={[
          "w-full max-w-5xl mx-4 rounded-full border transition-all duration-500 ease-out",
          scrolled
            ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]"
            : "bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border-zinc-200/50 dark:border-zinc-800/50 shadow-none",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center justify-between px-5 md:px-6 transition-all duration-500 ease-out",
            scrolled ? "py-2.5" : "py-3.5",
          ].join(" ")}
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
          >
            <div className="transition-transform duration-300 ease-out group-hover:scale-105">
              <Image src="/l.png" alt="LeetCode" width={30} height={30} />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Leet<span className="text-amber-500">Code</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative rounded-md px-3.5 py-2 text-sm font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 dark:text-zinc-400 dark:hover:text-white"
              >
                {link.label}
                <span className="absolute bottom-1 left-3.5 h-px w-0 bg-amber-500 transition-all duration-300 ease-out group-hover:w-[calc(100%-1.75rem)]" />
              </Link>
            ))}
          </div>

          {/* Right side (desktop) */}
          <div className="hidden md:flex items-center gap-2.5">
            <ModeToggle />
            <Show when="signed-in">
              {userRole && userRole === UserRole.ADMIN && (
                <Link href="/create-problem">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1.5 border-zinc-200 text-xs font-semibold dark:border-zinc-800 cursor-pointer transition-all duration-200 ease-out hover:-translate-y-px hover:border-amber-500 hover:bg-amber-500/5 hover:text-amber-500 dark:hover:bg-amber-500/10"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    Create Problem
                  </Button>
                </Link>
              )}
              <div className="rounded-full ring-1 ring-transparent transition-all duration-300 ease-out hover:ring-amber-500/50">
                <UserButton />
              </div>
            </Show>

            <Show when="signed-out">
              <SignInButton>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs font-semibold text-zinc-600 dark:text-zinc-300 cursor-pointer transition-all duration-200 ease-out hover:-translate-y-px hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-white"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button
                  size="sm"
                  className="h-8 bg-zinc-900 text-xs font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:-translate-y-px hover:bg-amber-500 hover:shadow-md hover:shadow-amber-500/25 dark:bg-white dark:text-zinc-900 dark:hover:bg-amber-500 dark:hover:text-white cursor-pointer"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </Show>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="relative flex h-8 w-8 items-center justify-center rounded-md text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 dark:text-zinc-200 md:hidden"
          >
            <Menu
              className={`absolute h-[18px] w-[18px] transition-all duration-300 ease-out ${
                mobileOpen
                  ? "scale-75 rotate-90 opacity-0"
                  : "scale-100 rotate-0 opacity-100"
              }`}
            />
            <X
              className={`absolute h-[18px] w-[18px] transition-all duration-300 ease-out ${
                mobileOpen
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-75 -rotate-90 opacity-0"
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`grid transition-all duration-300 ease-out md:hidden ${
            mobileOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-0.5 border-t border-zinc-200/70 px-4 pb-4 pt-2 dark:border-zinc-800/70">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms",
                  }}
                  className={`rounded-md px-3 py-2.5 text-sm font-medium text-zinc-600 transition-all duration-300 ease-out hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white ${
                    mobileOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-2 opacity-0"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-zinc-200/70 pt-3 dark:border-zinc-800/70">
                <ModeToggle />
                <div className="flex items-center gap-2">
                  <Show when="signed-in">
                    <UserButton />
                  </Show>
                  <Show when="signed-out">
                    <SignInButton>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs font-semibold"
                      >
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton>
                      <Button
                        size="sm"
                        className="bg-zinc-900 text-xs font-semibold text-white dark:bg-white dark:text-zinc-900"
                      >
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </Show>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
