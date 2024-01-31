import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { unstable_noStore as noStore } from "next/cache";

import { getServerAuthSession } from "~/server/auth";
import { Link } from "~/navigation";
import NavigationLink from "~/components/NavigationLink";
import LocaleSwitcher from "~/components/LocaleSwitcher";
// import { api } from "~/trpc/server";

type Props = {
  params: { locale: string };
};

export default async function IndexPage({ params: { locale } }: Props) {
  noStore();
  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Fetch translations because server components can't use hooks
  // const t = await getTranslations();
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  return (
    <MaxWidthWrapper>
      <div className="mx-auto flex max-w-3xl flex-col items-center py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Your marketplace for high-quality{" "}
          <span className="text-blue-600">digital assets</span>.
        </h1>
        <p className="mt-6 max-w-prose text-lg text-muted-foreground">
          Welcome to DigitalHippo. Every asset on our platform is verified by
          our team to ensure our highest quality standards.
        </p>
        <div>
          {/* <NavigationLink href="/pathnames">Browse Assets</NavigationLink> */}
          {/* <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-black/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link> */}
          <LocaleSwitcher />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
