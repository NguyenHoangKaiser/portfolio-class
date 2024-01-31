import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import LocaleSwitcher from "~/components/LocaleSwitcher";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import SelectTheme from "~/components/SelectTheme";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

type Props = {
  params: { locale: string };
};

export default async function IndexPage({ params: { locale } }: Props) {
  noStore();
  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Fetch translations because server components can't use hooks
  const t = await getTranslations();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

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
        <SelectTheme />
        <p className="text-2xl text-black">
          {hello ? hello.greeting : "Loading tRPC query..."}
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl text-black">
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <Link
            href={session ? "api/auth/signout" : "api/auth/signin"}
            className="rounded-full bg-black/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
