import Sidebar from "@/components/Sidebar";

export default function PrincipalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Sidebar/>

        <main className="relative ml-20 min-h-dvh py-14 px-20">
            {children}
        </main>
    </>
  );
}