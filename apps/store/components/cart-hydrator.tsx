"use client";

import type { CartWithProducts } from "@/lib/api/generated";
import { useEffect } from "react";
import { useCart } from "./cart-provider";

type CartHydratorProps = {
  cart: CartWithProducts | null;
};

export function CartHydrator({ cart }: CartHydratorProps) {
  const { hydrateCart } = useCart();

  useEffect(() => {
    hydrateCart(cart);
  }, [cart, hydrateCart]);

  return null;
}
