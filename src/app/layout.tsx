import type { Metadata } from "next";
import { quicksand, bebas } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "yrControl",
  description: "Saiba onde está o que faz sua empresa funcionar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${bebas.variable}`}>
        { children }
      </body>
    </html>
  );
}
