import { cn } from "@workspace/ui/lib/utils";
import Image, { type ImageProps } from "next/image";
import { type ReactNode } from "react";

type ProductImageVariant = "card" | "detail" | "cart" | "hero";

type FillVariantConfig = {
  kind: "fill";
  wrapperClassName: string;
  imageClassName: string;
  sizes: string;
};

type FixedVariantConfig = {
  kind: "fixed";
  width: number;
  height: number;
  imageClassName: string;
};

const PRODUCT_IMAGE_VARIANTS = {
  card: {
    kind: "fill",
    wrapperClassName:
      "relative aspect-video bg-white overflow-hidden border-b border-border",
    imageClassName: "object-contain",
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
  detail: {
    kind: "fill",
    wrapperClassName:
      "relative aspect-square bg-white overflow-hidden border-b border-border",
    imageClassName: "object-contain",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  cart: {
    kind: "fixed",
    width: 64,
    height: 64,
    imageClassName: "rounded-md object-cover bg-muted shrink-0",
  },
  hero: {
    kind: "fill",
    wrapperClassName: "relative size-full aspect-square bg-muted",
    imageClassName: "object-contain",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
} satisfies Record<ProductImageVariant, FillVariantConfig | FixedVariantConfig>;

type ProductImageProps = {
  src?: string | null;
  alt?: string | null;
  variant: ProductImageVariant;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
  priority?: ImageProps["priority"];
};

export function ProductImage({
  src,
  alt,
  variant,
  className,
  imageClassName,
  children,
  priority,
}: ProductImageProps) {
  const config = PRODUCT_IMAGE_VARIANTS[variant];
  const label = alt ?? "";

  if (!src) {
    if (config.kind === "fixed") {
      return (
        <div
          aria-label={label || undefined}
          className={cn(
            "flex items-center justify-center",
            config.imageClassName,
            imageClassName,
            className,
          )}
          style={{ width: config.width, height: config.height }}
        />
      );
    }

    return (
      <div
        aria-label={label || undefined}
        className={cn(config.wrapperClassName, className)}
      >
        {children}
      </div>
    );
  }

  if (config.kind === "fixed") {
    return (
      <Image
        src={src}
        alt={label}
        width={config.width}
        height={config.height}
        priority={priority}
        className={cn(config.imageClassName, imageClassName, className)}
      />
    );
  }

  return (
    <div className={cn(config.wrapperClassName, className)}>
      <Image
        src={src}
        alt={label}
        fill
        priority={priority}
        sizes={config.sizes}
        className={cn(config.imageClassName, imageClassName)}
      />
      {children}
    </div>
  );
}
