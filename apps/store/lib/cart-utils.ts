import { CartWithProducts } from "./api";

export function getItemCount(cart: CartWithProducts | null) {
  return cart?.totalItems ?? 0;
}

export function getSubtotal(cart: CartWithProducts | null) {
  return cart?.subtotal ?? 0;
}
