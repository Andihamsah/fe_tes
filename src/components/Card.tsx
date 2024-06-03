import { rupiah } from '@/utils/rupiah';
import { StarIcon } from '@heroicons/react/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/outline';
import React from 'react';

interface Product {
  img?: string;
  namaBarang: string;
  harga: number;
  rating: number;
  asal: string;
}

interface CardProps {
  product: Product;
}

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const totalStars = hasHalfStar ? fullStars + 1 : fullStars;
  const emptyStars = 5 - totalStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon key={index} className="h-5 w-5 text-yellow-500" />
      ))}
      {hasHalfStar && <StarIconOutline className="h-5 w-5 text-yellow-500" />}
      {[...Array(emptyStars)].map((_, index) => (
        <StarIconOutline key={index} className="h-5 w-5 text-gray-300" />
      ))}
    </div>
  );
};

const ProductImage: React.FC<{ product: Product }> = ({ product }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Ambil URL dasar dari variabel lingkungan
  const imageUrl = product?.img ? `${baseUrl}/storage/${product.img}` : "/default-image.jpg";

  return <img className="w-full h-48 object-cover" src={imageUrl} alt={product?.namaBarang || "Product"} width={50} height={50} />;
};

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer">
      <ProductImage product={product} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.namaBarang}</div>
        <p className="text-gray-700 text-base">{rupiah(product.harga)}</p>
        <div className="flex items-center">
          {renderStars(product.rating)}
          <span className="text-gray-600 text-sm ml-2">{product.rating}</span>
        </div>
        <p className="text-gray-600 text-sm">{product.asal}</p>
      </div>
    </div>
  );
};

export default Card;
