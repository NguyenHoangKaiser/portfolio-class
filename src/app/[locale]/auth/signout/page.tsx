import Title from "antd/lib/typography/Title";
import { LogoutButton } from "~/components/LoginButton";

export default function SignOutPage() {
  return (
    <section className="grid h-screen w-screen place-items-center bg-slate-800 px-4">
      <div className="w-full max-w-md rounded-lg bg-slate-700/30 shadow">
        <div className="p-4 md:p-5 lg:p-6">
          <Title level={4}>Are you sure you want to sign out?</Title>
          <div className="grid gap-y-3">
            <LogoutButton />
          </div>
        </div>
      </div>
    </section>
  );
}
