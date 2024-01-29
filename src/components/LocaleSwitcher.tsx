"use client";

import { usePathname, useRouter } from "~/navigation";
import { useCallback, useTransition } from "react";
import { Select } from "antd";
import { locales } from "~/config";
import { useLocale } from "next-intl";

const localeOptions = locales.map((locale) => ({
  label: locale,
  value: locale,
}));

const LocaleSwitcher = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale();

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
      defaultValue={locale}
      loading={isPending}
      disabled={isPending}
      onChange={handleOnChange}
      options={localeOptions}
    />
  );
};

export default LocaleSwitcher;
