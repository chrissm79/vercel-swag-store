"use client";

import { addToCart } from "@/actions/cart";
import { ProductQuantityPicker } from "@/components/product-quantity-picker";
import { CartWithProducts, Product } from "@/lib/api/generated";
import { Button } from "@workspace/ui/button";
import { Icon } from "@workspace/ui/icon";
import { useActionState, useState } from "react";

type AddToCartProps = {
  product: Product;
  inStock: number;
  disabled?: boolean;
};

export function AddToCart({ inStock: max, product, disabled }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [, action, isPending] = useActionState(
    async (prevState: CartWithProducts | null, formData: FormData) => {
      const qty = Number(formData.get("quantity"));
      if (qty <= 0 || qty > max || !product.id) {
        return prevState;
      }
      return addToCart(prevState, { productId: product.id, quantity: qty });
    },
    null,
  );

  return (
    <form className="flex justify-between w-full gap-2" action={action}>
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
