import { storeClient } from "@/lib/server/store-client";
import { Button } from "@workspace/ui/button";
import Image from "next/image";
import { AddToCart } from "./add-to-cart";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductsPage({ params }: PageProps) {
  const { id } = await params;
  const [product, stock] = await Promise.all([
    storeClient.getProduct(id),
    storeClient.getProductStock(id),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 items-start justify-center">
          <h1 className="text-4xl font-bold">{product.data.name}</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.data.description}
          </p>
          <div className="flex flex-wrap gap-4">
            {product.data.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-muted-foreground bg-muted px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground font-bold text-2xl">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: product.data.currency,
            }).format(product.data.price)}
          </p>
          {stock.data.stock > 0 && (
            <p className="text-sm text-muted-foreground">
              {stock.data.stock} in stock
            </p>
          )}
          {stock.data.inStock ? (
            <AddToCart product={product.data} inStock={stock.data.stock} />
          ) : (
            <Button variant="outline" disabled className="rounded-none px-12!">
              <span>Out of stock</span>
            </Button>
          )}
        </div>
        <div className="relative aspect-square bg-white overflow-hidden border-b border-border">
          <Image
            src={product.data.images[0]}
            alt={product.data.name}
            fill
            className="object-contain"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            {product.data.featured && (
              <span className="text-xs font-medium bg-primary text-primary-foreground px-2 py-1">
                Featured
              </span>
            )}
            {stock.data.lowStock && (
              <span className="text-xs font-medium bg-destructive text-white px-2 py-1">
                Low stock
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
