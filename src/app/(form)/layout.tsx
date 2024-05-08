import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function PrincipalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-h-dvh lg:px-20 sm:px-10 px-5 lg:py-16 py-8">
      <nav className="flex items-center h-[32px] w-full">
        <Image
            width={32}
            height={32}
            alt="yrControl"
            src={"/assets/favicon.ico"}
        />
        <Separator className="mx-6" orientation="vertical"/>
        <Link className="hover:underline" href={"/"}> Página inicial </Link>
      </nav>
        {children}
    </main>
  );
}