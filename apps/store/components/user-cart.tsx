import { getCartToken } from "@/lib/server/cart-session";
import { storeClient } from "@/lib/server/store-client";
import { CartHydrator } from "./cart-hydrator";
import { CartPopover } from "./cart-popover";

export async function UserCart() {
  const token = await getCartToken();
  const cart = token ? await storeClient.getCart(token) : null;

  return (
    <>
      <CartHydrator cart={cart?.data ?? null} />
      <CartPopover />
    </>
  );
}
