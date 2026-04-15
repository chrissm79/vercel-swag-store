import type { Product } from "@/lib/store-client";
import Image from "next/image";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="aspect-square bg-muted border border-border overflow-hidden">
      <div className="relative aspect-video bg-white overflow-hidden border-b border-border">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain"
        />
        {product.featured && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1">
            Featured
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between gap-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <p className="text-muted-foreground font-bold text-lg">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: product.currency,
          }).format(product.price)}
        </p>
      </div>
    </div>
  );
}
