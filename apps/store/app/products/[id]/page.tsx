import { storeClient, type Product } from "@/lib/server/store-client";
import { currencyFormatter } from "@/lib/string-utils";
import { Button } from "@workspace/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { AddToCart } from "./add-to-cart";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: product } = await storeClient.getProduct(id);
  return {
    title: product.name,
  };
}

export default function ProductsPage({ params }: PageProps) {
  return (
    <div className="container py-8">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail params={params} />
      </Suspense>
    </div>
  );
}

async function ProductDetail({ params }: PageProps) {
  const { id } = await params;
  const { data: product } = await storeClient.getProduct(id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-4 items-start justify-center">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>
        <div className="flex flex-wrap gap-4">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm text-muted-foreground bg-muted px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-muted-foreground font-bold text-2xl">
          {currencyFormatter(product.currency).format(product.price)}
        </p>
        <Suspense fallback={<StockSkeleton />}>
          <StockAction product={product} />
        </Suspense>
      </div>
      <div className="relative aspect-square bg-white overflow-hidden border-b border-border">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {product.featured && (
            <span className="text-xs font-medium bg-primary text-primary-foreground px-2 py-1">
              Featured
            </span>
          )}
          <Suspense fallback={null}>
            <LowStockBadge productId={product.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function StockAction({ product }: { product: Product }) {
  const { data: stock } = await storeClient.getProductStock(product.id);

  return (
    <>
      {stock.stock > 0 && (
        <p className="text-sm text-muted-foreground">{stock.stock} in stock</p>
      )}
      {stock.inStock ? (
        <AddToCart product={product} inStock={stock.stock} />
      ) : (
        <Button variant="outline" disabled className="rounded-none px-12!">
          <span>Out of stock</span>
        </Button>
      )}
    </>
  );
}

async function LowStockBadge({ productId }: { productId: string }) {
  const { data: stock } = await storeClient.getProductStock(productId);
  if (!stock.lowStock) return null;
  return (
    <span className="text-xs font-medium bg-destructive text-white px-2 py-1">
      Low stock
    </span>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-4 items-start justify-center">
        <div className="h-10 w-2/3 bg-muted animate-pulse" />
        <div className="h-16 w-full bg-muted animate-pulse" />
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-muted animate-pulse" />
          <div className="h-6 w-20 bg-muted animate-pulse" />
        </div>
        <div className="h-8 w-32 bg-muted animate-pulse" />
        <StockSkeleton />
      </div>
      <div className="aspect-square bg-muted animate-pulse border-b border-border" />
    </div>
  );
}

function StockSkeleton() {
  return (
    <>
      <div className="h-5 w-24 bg-muted animate-pulse" />
      <div className="h-10 w-full max-w-xs bg-muted animate-pulse" />
    </>
  );
}
