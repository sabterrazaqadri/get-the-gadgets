'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '../lib/client';

interface Product {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  price: number;
  salePrice?: number;
  images: Array<{
    asset: {
      _ref: string;
    };
  }>;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Get the first image URL directly (no state needed)
  const imageUrl = product.images && product.images.length > 0
    ? urlForImage(product.images[0], 300, 300)
    : undefined;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/products/${product.slug.current}`}>
        <div className="relative w-full h-64">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.slug.current}`}>
          <h3 className="font-medium text-lg mb-1 hover:text-gray-600">{product.title}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            {product.salePrice ? (
              <>
                <span className="text-red-600 font-medium">Rs. {product.salePrice}</span>
                <span className="ml-2 text-gray-500 line-through">Rs. {product.price}</span>
              </>
            ) : (
              <span className="font-medium">Rs. {product.price}</span>
            )}
          </div>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`I'm interested in ${product.title} - Rs. ${product.salePrice || product.price}. Check it out: ${typeof window !== 'undefined' ? window.location.origin : ''}/products/${product.slug.current}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800 transition-colors"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;