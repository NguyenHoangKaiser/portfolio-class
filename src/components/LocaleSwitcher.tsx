import { useLocale, useTranslations } from "next-intl";
import { locales } from "../config";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import icEn from "../../public/svg/icEn.svg";
import icVn from "../../public/svg/icVn.svg";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  const localeOptions = locales.map((locale) => ({
    label: t("locale", { locale }),
    value: locale,
    icon: locale === "vi" ? (icVn as StaticImport) : (icEn as StaticImport),
  }));

  return (
    <LocaleSwitcherSelect localeOptions={localeOptions} defaultValue={locale} />
  );
}
