import { ProductCard } from "@/components/product-card";
import { storeClient } from "@/lib/store-client";

export default async function SearchPage() {
  const products = await storeClient.getProducts();

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
