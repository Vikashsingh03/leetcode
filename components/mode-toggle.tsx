"use client";

import * as React from "react";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="group relative h-9 w-9 overflow-hidden border-zinc-200 transition-all duration-300 ease-out hover:border-indigo-300 hover:shadow-[0_0_0_4px_rgba(79,70,229,0.12)] dark:border-zinc-800 dark:hover:border-indigo-800"
        >
          <Sun
            className={`h-[1.1rem] w-[1.1rem] text-zinc-700 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              mounted && theme === "dark"
                ? "scale-0 -rotate-45 opacity-0"
                : "scale-100 rotate-0 opacity-100"
            }`}
          />
          <Moon
            className={`absolute h-[1.1rem] w-[1.1rem] text-zinc-300 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              mounted && theme === "dark"
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 rotate-45 opacity-0"
            }`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="min-w-40 rounded-xl border-zinc-200 p-1.5 shadow-lg shadow-black/5 dark:border-zinc-800 dark:shadow-black/30"
      >
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = mounted && theme === option.value;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className="group flex cursor-pointer items-center gap-2.5 rounded-lg py-2 text-sm font-medium text-zinc-600 transition-colors focus:bg-indigo-50 focus:text-indigo-700 dark:text-zinc-300 dark:focus:bg-indigo-950/50 dark:focus:text-indigo-300"
            >
              <Icon className="h-4 w-4 text-zinc-400 transition-colors group-focus:text-indigo-500" />
              <span className="flex-1">{option.label}</span>
              <Check
                className={`h-3.5 w-3.5 text-indigo-500 transition-all duration-200 ${
                  isActive ? "scale-100 opacity-100" : "scale-50 opacity-0"
                }`}
              />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
