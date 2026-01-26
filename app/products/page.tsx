import { client } from '../../lib/client';
import ProductCard from '../../components/ProductCard';

// Fetch products from Sanity
async function getProducts() {
  const query = `*[_type == "product"]{
    _id,
    title,
    slug,
    price,
    salePrice,
    images
  }`;
  
  const products = await client.fetch(query);
  return products;
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}