import { CartItem } from "./server/cart-session";

export function getItemCount(cart: CartItem[]) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getSubtotal(cart: CartItem[]) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
