import { getCartSession } from "@/lib/server/cart-session";
import { CartPopover } from "./cart-popover";

export async function UserCart() {
  const cart = await getCartSession();
  return <CartPopover cart={cart} />;
}
