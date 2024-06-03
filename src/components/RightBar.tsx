'use client'
import { api } from '@/utils/api';
import { rupiah } from '@/utils/rupiah';
import axios from 'axios';
import React, { useState, ChangeEvent } from 'react';

interface Product {
  id: number;
  namaBarang: string;
  harga: number;
  jumlahBarang: number;
  barangTerjual: number;
  img: string;
}

interface RightBarProps {
  product: Product | null;
  onClose: () => void;
}

const RightBar: React.FC<RightBarProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const maxQuantity = Math.min(Number(e.target.value), product.jumlahBarang);
    setQuantity(maxQuantity);
  };

  const handlePay = async () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    };

    const formData = new FormData();
    formData.append('product_id', String(product.id));
    formData.append('totalBarang', String(quantity));
    formData.append('totalHarga', String(product.harga * quantity));

    const response = await api.createPembelian(formData);
    if (response?.status === 'success') {
      alert('Pembelian berhasil, silahkan cek menu pembelian');
      window.location.reload();
    } else {
      alert('Pembelian gagal, silahkan coba lagi');
    }
  };

  const ProductImage: React.FC<{ product: Product }> = ({ product }) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Ambil URL dasar dari variabel lingkungan
    const imageUrl = product.img ? `${baseUrl}/storage/${product.img}` : "/default-image.jpg";

    return <img className="w-full h-48 object-cover mb-4" src={imageUrl} alt={product.namaBarang || "Product"} />;
  };

  return (
    <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-4">
      <button onClick={onClose} className="mb-4 text-red-500">Close</button>
      <h2 className="text-xl font-bold mb-4">Atur Jumlah Barang</h2>
      <ProductImage product={product} />
      <div className="mb-4">
        <div className="font-bold text-xl mb-2">{product.namaBarang}</div>
        <div className="font-bold text-sm mb-2">Sisa Produk: {product.jumlahBarang - product.barangTerjual}</div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
          Jumlah
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          min="1"
        />
      </div>
      <div className="mb-4">
        <p className="text-gray-700 text-base">
          Subtotal: {rupiah(product.harga * quantity)}
        </p>
      </div>
      <button
        onClick={handlePay}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Bayar
      </button>
    </div>
  );
};

export default RightBar;
