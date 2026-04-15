import { buttonVariants } from "@workspace/ui/button";
import { Icon } from "@workspace/ui/icon";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center gap-8 h-14 bg-foreground text-background" />
      <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-start gap-8 justify-center">
            <h2 className="text-6xl font-bold">The best swag for your team</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We offer the best swag for your team. We are a team of developers
              who are passionate about creating the best swag for your team.
            </p>
            <Link
              href="/products"
              className={cn(
                buttonVariants({ variant: "default" }),
                "font-semibold",
              )}
            >
              Browse products
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <div className="size-full bg-muted rounded-lg aspect-square" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Featured Products</h3>
            <Link
              href="/products"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "font-semibold text-muted-foreground",
              )}
            >
              <span>View all products</span>
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="size-full bg-muted rounded-lg aspect-square" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
