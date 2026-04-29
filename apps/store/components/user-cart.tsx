import { getCartToken } from "@/lib/server/cart-session";
import { storeClient } from "@/lib/server/store-client";
import { CartHydrator } from "./cart-hydrator";

export async function UserCart() {
  const token = await getCartToken();
  let cart: Awaited<ReturnType<typeof storeClient.getCart>> | null = null;
  let shouldClearCartToken = false;

  try {
    cart = token ? await storeClient.getCart(token) : null;
  } catch {
    shouldClearCartToken = true;
    cart = null;
  }

  return (
    <CartHydrator
      cart={cart?.data ?? null}
      clearCartToken={shouldClearCartToken}
    />
  );
}
