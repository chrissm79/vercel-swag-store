"use server";

import { CartWithProducts } from "@/lib/api";
import { getCartToken, getOrCreateCartToken } from "@/lib/server/cart-session";
import { storeClient } from "@/lib/server/store-client";
import { revalidatePath } from "next/cache";

type AddToCartInput = {
  productId: string;
  quantity: number;
};

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

  revalidatePath("/", "layout");
  return cart.data;
}

export async function removeFromCart(
  itemId: string,
): Promise<CartWithProducts | null> {
  const token = await getCartToken();

  if (!token) return null;

  const cart = await storeClient.removeCartItem(token, itemId);

  revalidatePath("/", "layout");
  return cart.data;
}

export async function updateCartItem(
  itemId: string,
  quantity: number,
): Promise<CartWithProducts | null> {
  const token = await getCartToken();

  if (!token) return null;

  const cart = await storeClient.updateCartItem(token, itemId, quantity);

  revalidatePath("/", "layout");
  return cart.data;
}
