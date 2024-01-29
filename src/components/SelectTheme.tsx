"use client";

import { useTheme } from "next-themes";

export function SelectTheme() {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      <button
        onClick={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
        }}
      >
        Theme
      </button>
    </div>
  );
}
