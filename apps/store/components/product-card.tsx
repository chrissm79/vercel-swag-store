import { Product } from "@/lib/api";
import { currencyFormatter } from "@/lib/string-utils";
import { buttonVariants } from "@workspace/ui/button";
import { Icon } from "@workspace/ui/icon";
import Link from "next/link";
import { ProductImage } from "./product-image";

export function ProductCard({ product }: { product: Product }) {
  const productName = product.name ?? "product";

  return (
    <div className="aspect-square bg-muted border border-border overflow-hidden">
      <ProductImage
        src={product.images?.[0]}
        alt={productName}
        variant="card"
      >
        <Link
          href={`/products/${product.id}`}
          className="absolute inset-0 z-10"
          aria-label={`View ${productName}`}
        />
        {product.featured && (
          <div className="absolute top-2 right-2 z-20 bg-primary text-primary-foreground text-xs font-medium px-2 py-1">
            Featured
          </div>
        )}
      </ProductImage>
      <div className="p-4 flex flex-col justify-between gap-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground font-bold text-lg">
            {currencyFormatter(product.currency).format(product.price)}
          </p>
          <Link
            href={`/products/${product.id}`}
            className={buttonVariants({
              variant: "ghost",
              className: "rounded-none shadow-none text-muted-foreground",
            })}
          >
            <span>View Product</span>
            <Icon name="arrowRight" className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
