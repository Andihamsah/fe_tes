'use client'
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import RightBar from '@/components/RightBar';
import axios from 'axios';
import { api } from '@/utils/api';
import Product from '../types';


export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    };      
    const fetchProduk = async () => {
      try {
        const response = await api.getProduk();
        if (response?.status === 'success') 
          setProducts(response?.data.filter(a => a?.shop_id !== Number(localStorage.getItem('shop'))));
      } catch (error) {
        console.error('Error fetching shop:', error);
      }
    };

    fetchProduk();
  }, []);

  return (
    <div className='flex flex-row'>
      <Navbar />
      <div className="container mx-auto p-4 w-full h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {products.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product)}>
              <Card product={product} />
            </div>
          ))}
        </div>
        {selectedProduct && <RightBar product={selectedProduct} onClose={handleClose} />}
      </div>
    </div>
  );
}
