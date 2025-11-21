"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Using useSyncExternalStore pattern for hydration safety
  if (typeof window !== "undefined" && !mounted) {
    setMounted(true);
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Sun className="size-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="size-5 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="size-5 transition-transform hover:-rotate-12" />
      )}
      <span className="sr-only">테마 전환</span>
    </Button>
  );
}
