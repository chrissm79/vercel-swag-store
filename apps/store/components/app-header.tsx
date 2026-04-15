import { Icon } from "@workspace/ui/icon";
import Link from "next/link";
import { Suspense } from "react";
import { UserCart } from "./user-cart";

export function AppHeader() {
  return (
    <header className="border-b border-border">
      <nav className="items-center justify-between max-w-7xl mx-auto px-4 py-3 hidden md:flex">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1155 1000"
              width={20}
              height={20}
              fill="currentColor"
              aria-label="Logo"
            >
              <path d="m577.3 0 577.4 1000H0z" />
            </svg>
            <span className="font-semibold text-sm">Swag Store</span>
          </Link>
          <ul className="flex items-center gap-4 text-sm">
            <li>
              <AppHeaderLink href="/">Home</AppHeaderLink>
            </li>
            <li>
              <AppHeaderLink href="/search">Search</AppHeaderLink>
            </li>
          </ul>
        </div>
        <Suspense
          fallback={
            <Icon name="cart" className="size-5 text-muted-foreground" />
          }
        >
          <UserCart />
        </Suspense>
      </nav>
      <nav className="h-15 flex md:hidden" />
    </header>
  );
}

function AppHeaderLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-muted-foreground p-2 hover:text-foreground"
    >
      {children}
    </Link>
  );
}
