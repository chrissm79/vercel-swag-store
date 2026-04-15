import "server-only";

import { cookies } from "next/headers";

const CART_COOKIE_NAME = "swag-store-cart";
const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export type CartItem = {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  currency: string;
  image?: string;
};

function parseCartCookie(value: string): CartItem[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function getCartSession() {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get(CART_COOKIE_NAME);
  return parseCartCookie(cartCookie?.value ?? "");
}

export async function setCartSession(cart: CartItem[]) {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE_NAME, JSON.stringify(cart), {
    maxAge: CART_COOKIE_MAX_AGE,
    path: "/",
  });
}
