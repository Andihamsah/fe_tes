import { rupiah } from '@/utils/rupiah';
import { StarIcon } from '@heroicons/react/outline';
import React from 'react';
import { StarIcon as StarIconOutline } from '@heroicons/react/outline';
import Button from './Button';

interface Product {
  namaBarang: string;
  harga: number;
  asal: string;
  rating: number;
  jumlahBarang: number;
  img: string;
}

interface ModalProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ModalProductDetail: React.FC<ModalProductDetailProps> = ({ isOpen, onClose, product }) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Detail Produk</h2>
          <Button onClick={onClose}>
            X
          </Button>
        </div>
        <ProductImage product={product} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{product.namaBarang}</div>
          <p className="text-gray-700 text-base">{rupiah(product.harga)}</p>
          <div className="font-bold text-sm mb-2">Sisa Produk: {product.jumlahBarang}</div>
          <div className="flex items-center">
            {renderStars(product.rating)}
            <span className="text-gray-600 text-sm ml-2">{product.rating}</span>
          </div>
          <p className="text-gray-600 text-sm">{product.asal}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalProductDetail;
