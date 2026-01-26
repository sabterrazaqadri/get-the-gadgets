import { client } from '../../../lib/client';
import ProductDetail from '../../../components/ProductDetail';

// Fetch product by slug from Sanity
async function getProductBySlug(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    price,
    salePrice,
    sizes,
    fabric,
    images,
    description,
    careInstructions,
    category,
    availability
  }`;

  const params = { slug };
  const product = await client.fetch(query, params);
  return product;
}

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p>The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}