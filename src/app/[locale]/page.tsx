import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import LocaleSwitcher from "~/components/LocaleSwitcher";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";

type Props = {
  params: { locale: string };
};

export default async function IndexPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Fetch translations because server components can't use hooks
  const t = await getTranslations();

  return (
    <MaxWidthWrapper>
      <div className="mx-auto flex max-w-3xl flex-col items-center py-20 text-center">
        <LocaleSwitcher />
        <h1>
          Your marketplace for high-quality
          <span className="text-blue-600"> digital assets</span>
        </h1>
        <p className="max-w-[590px]">
          {t.rich("IndexPage.description", {
            code: (chunks) => (
              <code className="font-mono text-red-600">{chunks}</code>
            ),
          })}
        </p>
      </div>
    </MaxWidthWrapper>
  );
}
