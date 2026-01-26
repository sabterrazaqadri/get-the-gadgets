'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlForImage } from '../lib/client';

interface Product {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  price: number;
  salePrice?: number;
  sizes: string[];
  fabric: string;
  images: Array<{
    asset: {
      _ref: string;
    };
  }>;
  description?: string;
  careInstructions?: string;
  category?: string;
  availability?: string;
}

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Set the first image as the display image
  const imageUrl = product.images && product.images.length > 0
    ? urlForImage(product.images[selectedImageIndex], 600, 600)
    : undefined;

  // Generate WhatsApp URL
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`I'm interested in ${product.title} - Rs. ${product.salePrice || product.price}. Check it out: ${typeof window !== 'undefined' ? window.location.origin : ''}/products/${product.slug.current}`)}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="relative w-full h-[500px] mb-4">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.title}
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`flex-shrink-0 w-20 h-20 border ${
                  selectedImageIndex === idx ? 'border-black' : 'border-gray-300'
                }`}
              >
                <Image
                  src={urlForImage(img, 80, 80) || ''}
                  alt={`${product.title} thumbnail ${idx + 1}`}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

          <div className="mb-4">
            {product.salePrice ? (
              <>
                <span className="text-2xl font-bold text-red-600">Rs. {product.salePrice}</span>
                <span className="ml-2 text-xl text-gray-500 line-through">Rs. {product.price}</span>
              </>
            ) : (
              <span className="text-2xl font-bold">Rs. {product.price}</span>
            )}
          </div>

          {product.category && (
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Category</h3>
              <p>{product.category}</p>
            </div>
          )}

          <div className="mb-4">
            <h3 className="font-semibold mb-1">Fabric</h3>
            <p>{product.fabric}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-1">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {product.availability && (
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Availability</h3>
              <p>{product.availability}</p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-semibold mb-1">Description</h3>
            <p>{product.description}</p>
          </div>

          {product.careInstructions && (
            <div className="mb-6">
              <h3 className="font-semibold mb-1">Care Instructions</h3>
              <p>{product.careInstructions}</p>
            </div>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-6 py-3 rounded block text-center hover:bg-gray-800 transition-colors"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;