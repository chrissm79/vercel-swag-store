import type * as apiTypes from "./generated";
import * as apiSdk from "./generated";
import { client as generatedClient } from "./generated/client.gen";

const baseUrl = process.env.STORE_API_BASE_URL;

if (baseUrl) {
  generatedClient.setConfig({ baseUrl });
}

type ApiResult = {
  data?: unknown;
  error?: unknown;
};

type ResolvedPayload<T> =
  NonNullable<T> extends Array<infer Item>
    ? Array<ResolvedPayload<Item>>
    : NonNullable<T> extends object
      ? { [K in keyof NonNullable<T>]-?: ResolvedPayload<NonNullable<T>[K]> }
      : NonNullable<T>;

type ResolvedData<T> = T extends { data?: infer Data }
  ? Omit<ResolvedPayload<T>, "data"> & { data: ResolvedPayload<Data> }
  : T;

type ApiData<T extends ApiResult> = ResolvedData<NonNullable<T["data"]>>;

export async function apiRequest<T extends ApiResult>(
  request: (client: typeof apiSdk) => Promise<T>,
): Promise<ApiData<T>> {
  const result = await request(apiSdk);

  if (result.error) {
    throw result.error;
  }

  if (result.data === undefined) {
    throw new Error("Store API returned no data");
  }

  return result.data as ApiData<T>;
}

export type * from "./generated";

export type GetProductsParams = apiTypes.ListProductsData["query"];

export type ProductResponse = ResolvedData<apiTypes.ProductResponse>;
export type ProductsResponse = ResolvedData<apiTypes.ProductListResponse>;
export type ProductStockResponse = ResolvedData<apiTypes.StockResponse>;
export type PromotionResponse = ResolvedData<apiTypes.PromotionResponse>;
export type CategoriesResponse = ResolvedData<apiTypes.CategoryListResponse>;

export type Product = ResolvedPayload<apiTypes.Product>;
export type ProductStock = ResolvedPayload<apiTypes.StockInfo>;
export type Promotion = ResolvedPayload<apiTypes.Promotion>;
export type Pagination = ResolvedPayload<apiTypes.PaginationMeta>;
export type Category = ResolvedPayload<apiTypes.Category>;
export type CategorySlug = NonNullable<GetProductsParams>["category"];
