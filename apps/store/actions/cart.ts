"use server";

import {
  CartItem,
  getCartSession,
  setCartSession,
} from "@/lib/server/cart-session";
import { Product } from "@/lib/server/store-client";
import { revalidatePath } from "next/cache";

export async function addToCart(
  formState: CartItem[],
  product: Product & { quantity: number },
): Promise<CartItem[]> {
  const cart = await getCartSession();
  const existingItem = cart.find((item) => item.productId === product.id);

  if (existingItem) {
    existingItem.quantity += product.quantity;
  } else {
    cart.push({
      currency: product.currency,
      name: product.name,
      price: product.price,
      image: product.images[0],
      productId: product.id,
      quantity: product.quantity,
    });
  }
  await setCartSession(cart);

  revalidatePath("/", "layout");

  return cart;
}

export async function removeFromCart(productId: string): Promise<CartItem[]> {
  const cart = await getCartSession();
  const updatedCart = cart.filter((item) => item.productId !== productId);
  await setCartSession(updatedCart);
  revalidatePath("/", "layout");
  return updatedCart;
}

export async function updateCartItem(
  productId: string,
  quantity: number,
): Promise<CartItem[]> {
  const cart = await getCartSession();
  const updatedCart = cart.map((item) =>
    item.productId === productId ? { ...item, quantity } : item,
  );
  await setCartSession(updatedCart);
  revalidatePath("/", "layout");
  return updatedCart;
}
