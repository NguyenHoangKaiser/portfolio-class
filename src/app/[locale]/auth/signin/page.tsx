import { getProviders } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";
import LoginButton from "~/components/LoginButton";
import { redirect } from "~/navigation";

const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  default: "Unable to sign in.",
};

type Err = keyof typeof errors;

const SignInError = ({ error }: { error: Err }) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return <div className="text-white">{errorMessage}</div>;
};

export default async function SignIn({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await getServerAuthSession();
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return redirect("/");
  }

  const providers = (await getProviders()) ?? [];

  const error = searchParams.error as Err | undefined;

  return (
    <section className="text-md grid h-screen w-screen place-items-center bg-slate-800 px-4 font-medium">
      <div className="w-full max-w-md rounded-lg bg-slate-700/30 shadow">
        <div className="p-4 md:p-5 lg:p-6">
          <div className="grid gap-y-3">
            {error && <SignInError error={error as Err} />}
            {providers
              ? Object.values(providers).map((provider) => {
                  if (provider.id !== "email") {
                    return (
                      <LoginButton key={provider.id} provider={provider} />
                    );
                  }
                })
              : ""}
          </div>
        </div>
      </div>
    </section>
  );
}
