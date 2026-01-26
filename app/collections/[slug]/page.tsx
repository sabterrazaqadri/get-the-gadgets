import { client } from '../../../lib/client';
import ProductCard from '../../../components/ProductCard';

// Fetch collection by slug from Sanity
async function getCollectionBySlug(slug: string) {
  const query = `*[_type == "collection" && slug.current == $slug][0]{
    _id,
    title,
    description,
    heroImage,
    linkedProducts[]->{_id, title, slug, price, salePrice, images}
  }`;
  
  const params = { slug };
  const collection = await client.fetch(query, params);
  return collection;
}

interface Props {
  params: {
    slug: string;
  };
}

export default async function CollectionPage({ params }: Props) {
  const collection = await getCollectionBySlug(params.slug);

  if (!collection) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Collection not found</h1>
        <p>The collection you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 ">{collection.title}</h1>
      <p className="text-gray-600 mb-8">{collection.description}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collection.linkedProducts.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}