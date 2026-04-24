export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  featured: boolean;
  tags: string[];
  createdAt: string;
};

export type ProductStock = {
  productId: string;
  stock: number;
  inStock: boolean;
  lowStock: boolean;
};

export type Promotion = {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  code: string;
  validFrom: string;
  validUntil: string;
  active: boolean;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type Category = {
  slug: string;
  name: string;
  productCount: number;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type ApiPaginationResponse<T> = ApiResponse<T> & {
  meta: {
    pagination: Pagination;
  };
};

export type ProductResponse = ApiResponse<Product>;
export type ProductsResponse = ApiPaginationResponse<Product[]>;
export type ProductStockResponse = ApiResponse<ProductStock>;
export type PromotionResponse = ApiResponse<Promotion>;
export type CategoriesResponse = ApiResponse<Category[]>;

export type GetProductsParams = {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  featured?: boolean;
};
