"use server";

import { CartWithProducts } from "@/lib/api";
import {
  clearCartToken,
  getCartToken,
  getOrCreateCartToken,
} from "@/lib/server/cart-session";
import { storeClient } from "@/lib/server/store-client";

type AddToCartInput = {
  productId: string;
  quantity: number;
};

export async function clearCart(): Promise<void> {
  await clearCartToken();
}

export async function addToCart(
  formState: CartWithProducts | null,
  input: AddToCartInput,
): Promise<CartWithProducts | null> {
  const token = await getOrCreateCartToken();
  const cart = await storeClient.addCartItem(
    token,
    input.productId,
    input.quantity,
  );

  return cart.data;
}

export async function removeFromCart(
  itemId: string,
): Promise<CartWithProducts | null> {
  const token = await getCartToken();

  if (!token) return null;

  try {
    const cart = await storeClient.removeCartItem(token, itemId);
    return cart.data;
  } catch {
    await clearCartToken();
    return null;
  }
}

export async function updateCartItem(
  itemId: string,
  quantity: number,
): Promise<CartWithProducts | null> {
  const token = await getCartToken();

  if (!token) return null;

  try {
    const cart = await storeClient.updateCartItem(token, itemId, quantity);
    return cart.data;
  } catch {
    await clearCartToken();
    return null;
  }
}
