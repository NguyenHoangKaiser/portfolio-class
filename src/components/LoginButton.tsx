"use client";

import { signIn, signOut, type ClientSafeProvider } from "next-auth/react";
import { Button } from "./ui/button";
import { GitHubLogoIcon, DiscordLogoIcon } from "@radix-ui/react-icons";

const getIcon = (name: string) => {
  switch (name) {
    case "GitHub":
      return <GitHubLogoIcon className="mr-2 h-5 w-5" />;
    case "Discord":
      return <DiscordLogoIcon className="mr-2 h-5 w-5" />;
    case "Google":
      return (
        <svg
          style={{ color: "rgb(203, 213, 225)" }}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
            fill="#cbd5e1"
          ></path>
        </svg>
      );
    default:
      return null;
  }
};

const LoginButton = ({ provider }: { provider: ClientSafeProvider }) => {
  return (
    <Button
      className="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-3 text-slate-300 transition hover:text-blue-400"
      onClick={() =>
        signIn(provider.id, {
          callbackUrl: "/",
        })
      }
    >
      {getIcon(provider.name)}
      <span>Sign in with {provider.name}</span>
    </Button>
  );
};

const LogoutButton = () => {
  return (
    <Button
      className="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-3 text-slate-300 transition hover:text-blue-400"
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      <span>Sign out</span>
    </Button>
  );
};

export { LogoutButton };
export default LoginButton;
