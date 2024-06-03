'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Button from './Button';
import { api } from '@/utils/api';
import axios from 'axios';

interface Product {
  id?: number;
  namaBarang: string;
  harga: string;
  asal: string;
  rating: number;
  jumlahBarang: string;
  img: string;
}

interface ModalProductProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  product?: Product;
}

const ModalProduct: React.FC<ModalProductProps> = ({ isOpen, onClose, onSubmit, product }) => {
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [productOrigin, setProductOrigin] = useState<string>('');
  const [productRating, setProductRating] = useState<number>(0);
  const [productTotal, setProductTotal] = useState<string>('');
  const [productImage, setProductImage] = useState<File | null>(null);

  useEffect(() => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    };      
    if (product) {
      setProductName(product?.namaBarang);
      setProductPrice(product?.harga);
      setProductOrigin(product?.asal);
      setProductRating(product?.rating);
      setProductTotal(product?.jumlahBarang);
      setProductImage(null);
    } else {
      setProductName('');
      setProductPrice('');
      setProductOrigin('');
      setProductRating(0);
      setProductTotal('');
      setProductImage(null);
    }
  }, [product]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const shop = localStorage.getItem('shop') || '';
    const formData = new FormData();
    formData.append('namaBarang', productName);
    formData.append('harga', productPrice);
    formData.append('asal', productOrigin);
    formData.append('rating', productRating.toString());
    formData.append('jumlahBarang', productTotal);
    formData.append('shop_id', shop);
    if (productImage) {
      formData.append('img', productImage);
    }
    console.log(formData, product, productName)
    if (product) {
      formData.append('_method', 'put');
      const response = await api.updateProduk({ formData, id: product.id! });
      if (response?.status === 'success') {
        window.location.reload();
      }
    } else {
      const response = await api.createProduk(formData);
      if (response?.status === 'success') {
        window.location.reload();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{product ? 'Ubah Produk' : 'Tambah Produk'}</h2>
          <Button onClick={onClose}>
            X
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nama Produk</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Harga</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Asal Produk</label>
            <input
              type="text"
              value={productOrigin}
              onChange={(e) => setProductOrigin(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rating</label>
            <input
              type="number"
              value={productRating}
              onChange={(e) => {
                const besar = Math.min(Math.max(Number(e.target.value), 0), 5);
                setProductRating(besar);
              }}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total Produk</label>
            <input
              type="number"
              value={productTotal}
              onChange={(e) => setProductTotal(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              accept="image/*"
            />
            <div className='text-lg text-green-500'>{product && product.img.split('/')[0]}</div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {product ? 'Ubah Produk' : 'Tambah Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProduct;
