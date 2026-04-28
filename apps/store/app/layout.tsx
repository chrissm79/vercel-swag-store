import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";
import { CartProvider } from "@/components/cart-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "Swag Store | %s",
    absolute: "Swag Store",
  },
  description: "Vercel swag store",
  openGraph: {
    siteName: "Swag Store",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col">
        <CartProvider>
          <AppHeader />
          <main className="flex-1">{children}</main>
          <AppFooter />
        </CartProvider>
      </body>
    </html>
  );
}
