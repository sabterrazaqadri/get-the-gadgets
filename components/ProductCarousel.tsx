'use client';

import { useState, useEffect } from 'react';
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

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance the carousel every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
  };

  const goToPrev = () => {
    setCurrentIndex(currentIndex === 0 ? products.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === products.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="py-12 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Featured Products</h2>
      <div className="max-w-6xl mx-auto relative">
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {products.map((product) => {
              const imageUrl = product.images && product.images.length > 0
                ? urlForImage(product.images[0], 600, 600)
                : undefined;

              return (
                <div
                  key={product._id}
                  className="w-full flex-shrink-0 relative"
                >
                  <Link href={`/products/${product.slug.current}`}>
                    <div className="relative h-96">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={product.title}
                          fill
                          className=" sm:object-cover md:object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">No image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                        <div className="text-white">
                          <h3 className="text-xl line-clamp-2 font-bold md:text-3xl">{product.title}</h3>
                          <div className="mt-2 mb-5">
                            {product.salePrice ? (
                              <>
                                <span className="text-red-400 font-bold">Rs. {product.salePrice}</span>
                                <span className="ml-2 text-gray-300 line-through">Rs. {product.price}</span>
                              </>
                            ) : (
                              <span className="font-bold">Rs. {product.price}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation buttons - now always visible */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition-opacity duration-300 z-10"
          aria-label="Previous product"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition-opacity duration-300 z-10"
          aria-label="Next product"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;