'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { api } from '@/utils/api';
import ModalPurchaseDetail from './ModalPurchaseDetail';
import Table from './Table';

interface Purchase {
  id: number;
  // Definisikan tipe data yang sesuai untuk properti pembelian lainnya
}

export default function Order() {
  const [pembelian, setPembelian] = useState<Purchase[]>([]);
  const [isModalView, setIsModalView] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Purchase | null>(null);

  useEffect(() => {
    axios.defaults.headers.common = {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    };
    const fetchPembelian = async () => {
      try {
        const response = await api.getPembelian();
        if (response?.status === 'success') {
          setPembelian(response?.data);
        }
      } catch (error) {
        console.error('Error fetching pembelian:', error);
      }
    };

    fetchPembelian();
  }, []);

  const handleRetur = async (pembelianId: number) => {
    if (!window.confirm('Are you sure you want to retur your purchase?')) {
      return;
    }

    const response = await api.deletePembelian(pembelianId);
    if (response?.status === 'success') {
      window.location.reload();
    }
  };

  const handleCloseModal = () => {
    setIsModalView(false);
  };

  const handleDetailProduct = (product: Purchase) => {
    setSelectedProduct(product);
    setIsModalView(true);
  };

  return (
    <div className='flex flex-row'>
      <Navbar />
      <Table pembelian={pembelian} onDelete={handleRetur} onView={handleDetailProduct} />
      <ModalPurchaseDetail isOpen={isModalView} onClose={handleCloseModal} purchase={selectedProduct} />
    </div>
  );
}
