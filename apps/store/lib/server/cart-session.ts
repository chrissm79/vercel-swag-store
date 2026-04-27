import "server-only";

import { cookies } from "next/headers";
import { storeClient } from "./store-client";

const CART_COOKIE_NAME = "swag-store-cart-token";
const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function getCartToken() {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get(CART_COOKIE_NAME);
  return cartCookie?.value;
}

export async function setCartToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: CART_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
}

export async function clearCartToken() {
  const cookieStore = await cookies();
  cookieStore.delete(CART_COOKIE_NAME);
}

export async function getOrCreateCartToken() {
  const existingToken = await getCartToken();

  if (existingToken) {
    return existingToken;
  }

  const cart = await storeClient.createCart();
  const token = cart.data.token;

  if (!token) {
    throw new Error("Store API did not return a cart token");
  }

  await setCartToken(token);
  return token;
}
