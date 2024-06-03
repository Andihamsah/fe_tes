'use client'
import Button from '@/components/Button';
import ModalProduct from '@/components/ModalProduct';
import ModalProductDetail from '@/components/ModalProductDetail';
import ProductTable from '@/components/Table';
import { api } from '@/utils/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  // Define other properties as needed
}

export default function Produk() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const handleOpenModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalOpenDetail(false);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDetailProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpenDetail(true);
  };

  const handleViewProduct = (product: Product) => {
    // Logic to view product details, e.g., open a modal or redirect to a detail page
    console.log('View product details:', product);
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm('Are you sure you want to delete your product?')) {
      return;
    }

    const response = await api.deleteProduk(productId);
    if (response?.status === 'success') {
      window.location.reload();
    }
  };

  useEffect(() => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    };
    const fetchProduk = async () => {
      try {
        const responseProduk = await api.getProduk();
        if (responseProduk?.status === 'success') {
          console.log(responseProduk);
          setProducts(responseProduk?.data.filter(produk => produk.shop_id === Number(localStorage.getItem('shop'))));
        }
      } catch (error) {
        console.error('Error fetching shop:', error);
      }
    };

    fetchProduk();
  }, []);

  return (
    <>
      <div className='flex justify-between my-2'>
        <h2 className="text-xl font-bold mb-2">Products</h2>
        <Button type="submit" onClick={handleOpenModal}>Tambah Product</Button>
      </div>
      <ProductTable
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onView={handleDetailProduct}
      />
      <ModalProduct
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
      <ModalProductDetail
        isOpen={isModalOpenDetail}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </>
  );
}
