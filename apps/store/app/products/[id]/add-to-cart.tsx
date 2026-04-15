"use client";

import { addToCart } from "@/actions/cart";
import { ProductQuantityPicker } from "@/components/product-quantity-picker";
import { CartItem } from "@/lib/server/cart-session";
import { type Product } from "@/lib/server/store-client";
import { Button } from "@workspace/ui/button";
import { Icon } from "@workspace/ui/icon";
import { useActionState, useState } from "react";

type AddToCartProps = {
  product: Product;
  inStock: number;
};

export function AddToCart({ inStock: max, product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [, action, isPending] = useActionState(
    async (prevState: CartItem[], formData: FormData) => {
      const qty = Number(formData.get("quantity"));
      if (qty <= 0 || qty > max) {
        return prevState;
      }
      return addToCart(prevState, { ...product, quantity: qty });
    },
    [],
  );

  return (
    <form className="flex flex-col gap-2" action={action}>
      <ProductQuantityPicker
        max={max}
        quantity={quantity}
        onChange={setQuantity}
      />
      <Button
        type="submit"
        className="rounded-none px-12!"
        disabled={isPending}
      >
        <span>Add to cart</span>
        <Icon name="cart" className="size-3" />
      </Button>
    </form>
  );
}
