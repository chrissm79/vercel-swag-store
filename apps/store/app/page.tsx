import { ProductCard } from "@/components/product-card";
import { PromoBanner } from "@/components/promo-banner";
import { storeClient } from "@/lib/server/store-client";
import { buttonVariants } from "@workspace/ui/button";
import { Icon } from "@workspace/ui/icon";
import { cn } from "@workspace/ui/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const products = await storeClient.getProducts({
    featured: "true",
  });

  return (
    <>
      <Suspense fallback={null}>
        <PromoBanner />
      </Suspense>
      <div className="container flex flex-col gap-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-start gap-8 justify-center">
            <h2 className="text-6xl font-bold">The best swag for your team</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We offer the best swag for your team. We are a team of developers
              who are passionate about creating the best swag for your team.
            </p>
            <Link
              href="/search"
              className={cn(
                buttonVariants({ variant: "default" }),
                "font-semibold rounded-none",
              )}
            >
              Browse products
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <div className="size-full bg-muted aspect-square" />
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
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
