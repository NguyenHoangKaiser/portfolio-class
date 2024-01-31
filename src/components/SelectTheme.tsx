"use client";

import { Button } from "antd";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import withTheme from "./withTheme";

const SelectThemeComp = () => {
  const { setTheme, theme } = useTheme();
  const locale = useLocale();

  return (
    <div>
      <Button
        onClick={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
        }}
      >
        {locale === "en" ? "Theme" : "Chủ đề"}
      </Button>
    </div>
  );
};

const SelectTheme = () => {
  return withTheme(<SelectThemeComp />);
};

export default SelectTheme;
