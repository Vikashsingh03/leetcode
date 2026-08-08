import { currentUserRole } from "@/modules/auth/actions";
import { Navbar } from "@/modules/home/components/navbar";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const result = await currentUserRole();
  const userRole = result?.role ?? null;

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar userRole={userRole} />
      <div className="flex flex-1 flex-col px-4 pb-4">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] dark:bg-size[16px_16px] bg-[radial-gradient(#dadde2_1px,transparent_1px)] bg-size-[16px_16px]"></div>
        {children}
      </div>
    </main>
  );
};

export default RootLayout;