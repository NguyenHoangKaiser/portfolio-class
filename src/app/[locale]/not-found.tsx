import { useTranslations } from "next-intl";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");

  return (
    <MaxWidthWrapper>
      <p className="max-w-[460px]">{t("description")}</p>
    </MaxWidthWrapper>
  );
}
