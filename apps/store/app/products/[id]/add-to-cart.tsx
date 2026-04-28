"use client";

import { useCart } from "@/components/cart-provider";
import { ProductQuantityPicker } from "@/components/product-quantity-picker";
import { Product } from "@/lib/api/generated";
import { Button } from "@workspace/ui/button";
import { Icon } from "@workspace/ui/icon";
import { FormEvent, useState } from "react";

type AddToCartProps = {
  product: Product;
  inStock: number;
  disabled?: boolean;
};

export function AddToCart({ inStock: max, product, disabled }: AddToCartProps) {
  const { addItem, isPending } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (quantity <= 0 || quantity > max || !product.id) return;

    addItem(product, quantity);
  };

  return (
    <form className="flex justify-between w-full gap-2" onSubmit={handleSubmit}>
      <Button
        type="submit"
        className="rounded-none px-12!"
        disabled={isPending || disabled}
      >
        <span>Add to cart</span>
        <Icon name="cart" className="size-3" />
      </Button>
      <ProductQuantityPicker
        max={max}
        quantity={quantity}
        onChange={setQuantity}
      />
    </form>
  );
}
