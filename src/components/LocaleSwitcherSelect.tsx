/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { Select } from "antd";
import { usePathname, useRouter } from "~/navigation";
import { useCallback, useTransition } from "react";
import Image from "next/image";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
  defaultValue: string;
  localeOptions: {
    label: string;
    value: string;
    icon: string | StaticImport;
  }[];
};

export default function LocaleSwitcherSelect({
  localeOptions,
  defaultValue,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  //   const locale = useLocale();

  const handleOnChange = useCallback(
    (value: string) => {
      startTransition(() => {
        router.push(pathname, { locale: value });
      });
    },
    [pathname, router, startTransition],
  );

  return (
    <Select
      defaultValue={defaultValue}
      loading={isPending}
      disabled={isPending}
      onChange={handleOnChange}
      style={{ width: 140 }}
      options={localeOptions}
      optionRender={(option) => (
        <div className="flex items-center">
          <Image
            src={option.data.icon}
            alt={option.data.label}
            width={14}
            height={14}
          />
          <span className="ml-2">{option.data.label}</span>
        </div>
      )}
    />
  );
}
