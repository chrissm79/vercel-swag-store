"use client";

import { clearCart } from "@/actions/cart";
import type { CartWithProducts } from "@/lib/api/generated";
import { useEffect } from "react";
import { useCart } from "./cart-provider";

type CartHydratorProps = {
  cart: CartWithProducts | null;
  clearCartToken?: boolean;
};

export function CartHydrator({ cart, clearCartToken }: CartHydratorProps) {
  const { hydrateCart } = useCart();

  useEffect(() => {
    hydrateCart(cart);
  }, [cart, hydrateCart]);

  useEffect(() => {
    if (!clearCartToken) return;

    void clearCart();
  }, [clearCartToken]);

  return null;
}
