import { getCartToken } from "@/lib/server/cart-session";
import { storeClient } from "@/lib/server/store-client";
import { CartPopover } from "./cart-popover";

export async function UserCart() {
  const token = await getCartToken();
  if (!token) {
    return <CartPopover cart={null} />;
  }

  const cart = await storeClient.getCart(token);

  return <CartPopover cart={cart.data} />;
}
