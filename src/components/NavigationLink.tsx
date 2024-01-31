"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { type ComponentProps } from "react";
import type { AppPathnames } from "../config";
import { Link } from "../navigation";

export default function NavigationLink<Pathname extends AppPathnames>({
  href,
  ...rest
}: ComponentProps<typeof Link<Pathname>>) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      href={href}
      style={{ fontWeight: isActive ? "bold" : "normal" }}
      {...rest}
    />
  );
}
