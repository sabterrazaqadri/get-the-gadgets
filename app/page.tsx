import Layout from './layout';
import { client, urlForImage } from '../lib/client';
import Link from 'next/link';
import Image from 'next/image';
import ProductCarousel from '../components/ProductCarousel';

// Fetch collections from Sanity
async function getCollections() {
  const query = `*[_type == "collection"]{
    _id,
    title,
    slug,
    heroImage,
    description
  }`;

  const collections = await client.fetch(query);
  return collections;
}

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

export default async function HomePage() {
  const collections = await getCollections();
  const products = await getProducts();

  // Limit to 6 products for the carousel
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Get the Gadgets</h1>
      <p className="text-center text-gray-700 mb-12">Discover our exclusive collection of fashion items.</p>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection: any) => (
            <Link
              key={collection._id}
              href={`/collections/${collection.slug.current}`}
              className="block border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {collection.heroImage ? (
                <div className="relative md:h-48 h-40 ">
                  <Image
                    src={urlForImage(collection.heroImage, 400, 200)}
                    alt={collection.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">{collection.title}</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="font-medium text-lg">{collection.title}</h3>
                <p className="text-gray-600 line-clamp-2">{collection.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Product Carousel Section */}
      {featuredProducts.length > 0 && (
        <ProductCarousel products={featuredProducts} />
      )}

      <div className="text-center mt-12">
        <Link
          href="/products"
          className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}
