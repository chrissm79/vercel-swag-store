import { Icon } from "@workspace/ui/icon";
import Link from "next/link";

export function AppHeader() {
  return (
    <header>
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
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
              <Link href="/" className="text-muted-foreground py-2 px-2">
                Home
              </Link>
            </li>
            <li>
              <Link href="/search" className="text-muted-foreground py-2 px-2">
                Search
              </Link>
            </li>
          </ul>
        </div>
        <Icon name="cart" className="size-5 text-muted-foreground" />
      </nav>
    </header>
  );
}
