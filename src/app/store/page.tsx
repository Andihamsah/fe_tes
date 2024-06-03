/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from 'react';
import Button from '@/components/button';
import ModalProduct from '@/components/modalProduct';
import Navbar from '@/components/navbar';
import Produk from './Produk';
import { api } from '@/utils/api';
import axios from 'axios';

export default function Page() {
  const [value, setValue] = useState<string | undefined>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await api.updateShop({ namaToko: value });
      setValue(result?.data.namaToko);
      alert(result?.message);
    } catch (error) {
      setError('Failed to update shop name. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStore = async () => {
    const response = await api.createShop();
    if (response?.status === 'success') {
      localStorage.setItem('role', 'admin');
      localStorage.setItem('shop', response?.data.id);
      window.location.reload();
    }
    alert(response?.message);
  };

  const handleDeleteShop = async () => {
    if (!confirm('Are you sure you want to delete your shop? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.deleteShop();
      if (response?.status === 'success') {
        localStorage.setItem('role', 'buyer');
        localStorage.setItem('shop', '');
        window.location.reload();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleViewProduct = (product: any) => {
    // Logic to view product details, e.g., open a modal or redirect to a detail page
    console.log('View product details:', product);
  };


  useEffect(() => {
    setRole(window.localStorage.getItem('role') || '');
    axios.defaults.headers.common = {
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    };
    const fetchShop = async () => {
      try {
        const response = await api.getShop();
        setValue(response?.data?.shop?.namaToko || '');
        // const responseProduk = await api.getProduk();
        // setProducts(responseProduk.data || []);
      } catch (error) {
        console.error('Error fetching shop:', error);
      }
    };
    // const fetchProduk = async () => {
    //     try {
    //         const responseProduk = await api.getProduk();
    //         setProducts(responseProduk.data || []);
    //     } catch (error) {
    //         console.error('Error fetching shop:', error);
    //     }
    // };

    // fetchProduk();

    fetchShop();
  }, []);

  return (
    <div>
      <Navbar />
      {role !== 'admin' ? (
        <div className='flex flex-col items-center justify-center h-full'>
          <p>You dont have a store yet. Click the button below to create one!</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCreateStore}>
            Create Store
          </button>
        </div>
      ) : (
        <div className='p-4'>
          <p className='flex items-center justify-center'>Here you can manage your store and products.</p>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Profil Toko</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto mt-8">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopName">
                  Nama Toko
                </label>
                <input
                  id="shopName"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-xs italic justify-center">{error}</p>}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Shop Name'}
                </button>
                <button
                  className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                  onClick={handleDeleteShop}
                >
                  {loading ? 'Deleted...' : 'Delete Shop'}
                </button>
              </div>
            </form>
          </div>
          <div>
            <Produk  />
          </div>
        </div>
      )}
    </div>
  );
}
