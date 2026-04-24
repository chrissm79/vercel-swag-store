import { ProductCard } from "@/components/product-card";
import { SearchFilter } from "@/components/search-filter";
import { SearchInput } from "@/components/search-input";
import { storeClient } from "@/lib/server/store-client";
import { Skeleton } from "@workspace/ui/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search",
};

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

async function SearchResults({ searchParams }: SearchPageProps) {
  const { q: search, category } = await searchParams;

  const [products, categories] = await Promise.all([
    storeClient.getProducts({ search, category }),
    storeClient.getCategories(),
  ]);

  return (
    <>
      <div className="flex gap-4 items-center justify-between">
        <SearchFilter categories={categories.data} />
        <SearchInput />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

function SearchResultsSkeleton() {
  return (
    <>
      <Skeleton className="h-9" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-full w-full aspect-square" />
        ))}
      </div>
    </>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div className="container flex flex-col gap-8 py-8">
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
