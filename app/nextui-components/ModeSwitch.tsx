import React, { useEffect, useState } from "react";
import { VisuallyHidden, useSwitch } from "@nextui-org/react";

import { IoMdMoon } from "react-icons/io";
import { LuSun } from "react-icons/lu";
import { useTheme } from "next-themes";

const ThemeSwitch = (props: any) => {
  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch(props);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} onClick={(e) => (theme === "dark" ? setTheme("light") : setTheme("dark"))} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: ["w-10 h-10", "flex items-center justify-center", "rounded-lg bg-default-100 hover:bg-default-200"],
          })}
        >
          {theme === "dark" ? <LuSun /> : <IoMdMoon />}
        </div>
      </Component>
    </div>
  );
};

export default function App() {
  return <ThemeSwitch />;
}
