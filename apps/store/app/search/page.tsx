import { ProductCard } from "@/components/product-card";
import { SearchFilter } from "@/components/search-filter";
import { SearchInput } from "@/components/search-input";
import { storeClient } from "@/lib/server/store-client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@workspace/ui/pagination";
import { Skeleton } from "@workspace/ui/skeleton";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search",
};

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
};

async function SearchResults({ searchParams }: SearchPageProps) {
  const { q: search, category, page: pageParam } = await searchParams;
  const page = extractPageParam(pageParam);

  const [products, categories] = await Promise.all([
    storeClient.getProducts({ search, category, page, limit: 5 }),
    storeClient.getCategories(),
  ]);

  const totalPages = products.meta.pagination.totalPages;
  const paginationUrls = Array.from({ length: totalPages }).map((_, index) => {
    const urlParams = new URLSearchParams();
    if (search) urlParams.set("q", search);
    if (category) urlParams.set("category", category);
    urlParams.set("page", String(index + 1));
    return `/search?${urlParams.toString()}`;
  });

  return (
    <>
      <div className="flex gap-4 items-center justify-between">
        <SearchFilter categories={categories.data} />
        <SearchInput />
      </div>
      {products.data.length === 0 && <EmptySearchResults />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {Array.from({ length: totalPages }).length > 1 && (
        <Pagination>
          <PaginationContent>
            {paginationUrls.map((href, index) => (
              <PaginationItem key={href}>
                <PaginationLink
                  size="icon"
                  href={href}
                  isActive={page === index + 1}
                  render={<Link href={href}>{index + 1}</Link>}
                />
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      )}
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

function EmptySearchResults() {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-semibold mb-4">No products found</h2>
      <p className="text-muted-foreground">
        Try adjusting your search or filter to find what you're looking for.
      </p>
    </div>
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

function extractPageParam(param: string | string[] | undefined): number {
  if (typeof param === "string") {
    const page = Number(param);
    return isNaN(page) ? 1 : page;
  }

  return 1;
}
