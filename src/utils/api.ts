'use client'
import axios from 'axios';
import React from 'react';

interface ApiResponse<T> {
  status: string;
  data: T;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface ShopData {
  id: number;
  name: string;
  user_id: number;
}

interface ProductData {
  shop_id: number;
  id: number;
  name: string;
  price: number;
  img: string;
}

interface PurchaseData {
  id: number;
  product_id: number;
  quantity: number;
}

export const api = (() => {
  const login = async (data: LoginData): Promise<ApiResponse<any> | undefined> => {
    const response = await axios.post<ApiResponse<any>>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, data);

    const body = response.data;

    if (body.status !== 'success') {
      console.error("Data not found");
      return;
    }

    return body;
  };

  const register = async (data: RegisterData): Promise<ApiResponse<any> | undefined> => {
    const response = await axios.post<ApiResponse<any>>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`, data);

    const body = response.data;

    if (body.status !== 'success') {
      console.error("Data not found");
      return;
    }

    return body;
  };

  const getShop = async (): Promise<ApiResponse<ShopData> | undefined> => {
    const response = await axios.get<ApiResponse<ShopData>>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shop`);

    const body = response.data;

    if (body.status !== 'success') {
      console.error("Data not found");
      return;
    }

    return body;
  };

  const createShop = async (): Promise<ApiResponse<any> | undefined> => {
    const response = await axios.post<ApiResponse<any>>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/create-shop`);

    const body = response.data;

    if (body.status !== 'success') {
      console.error("Data not found");
      return;
    }

    return body;
  };

  const updateShop = async (data: Partial<ShopData>): Promise<ApiResponse<any> | undefined> => {
    const response = await axios.put<ApiResponse<any>>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/update-shop`, data);

    const body = response.data;

    if (body.status !== 'success') {
      console.error("Data not found");
      return;
    }

    return body;
  };

  const deleteShop = async (): Promise<ApiResponse<any> | undefined> => {
    const response = await axios.delete<ApiResponse<any>>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/delete-shop`);

    const body = response.data;

    if (body.status !== 'success') {
      console.error("Data not found");
      return;
    }

    return body;
  };

  const getProduk = async (): Promise<ApiResponse<ProductData[]> | undefined> => {
    const response = await axios.get<ApiResponse<ProductData[]>>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`);

    const body = response.data;

    console.log(body);

    if (body.status !== 'success') {
      console.error("Data not found");
      return;
    }

    return body;
  };

  const createProduk = async (data: FormData): Promise<ApiResponse<any> | undefined> => {
    const response = await axios.post<ApiResponse<any>>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const body = response.data;

    if (body.status !== 'success') {
      console.error("Data not found");
      return;
    }

    return body;
  };

  const updateProduk = async ({ formData, id }: { formData: FormData; id: number }): Promise<ApiResponse<any> | undefined> => {
    const response = await axios.post<ApiResponse<any>>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const body = response.data;

    if (body.status !== 'success') {
      console.error("Data not found");
      return;
    }

    return body;
  };

  const deleteProduk = async (data: number): Promise<ApiResponse<any> | undefined> => {
    const response = await axios.delete<ApiResponse<any>>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${data}`);

    const body = response.data;

    if (body.status !== 'success') {
      console.error("Data not found");
      return;
    }

    return body;
  };

  const getPembelian = async (): Promise<ApiResponse<PurchaseData[]> | undefined> => {
    const response = await axios.get<ApiResponse<PurchaseData[]>>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pembelian`);

    const body = response.data;

    console.log(body);

    if (body.status !== 'success') {
      console.error("Data not found");
      return;
    }

    return body;
  };

  const createPembelian = async (data: FormData): Promise<ApiResponse<any> | undefined> => {
    const response = await axios.post<ApiResponse<any>>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pembelian`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const body = response.data;

    if (body.status !== 'success') {
      console.error("Data not found");
      return;
    }

    return body;
  };

  const updatePembelian = async ({ formData, id }: { formData: FormData; id: number }): Promise<ApiResponse<any> | undefined> => {
    const response = await axios.post<ApiResponse<any>>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pembelian/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const body = response.data;

    if (body.status !== 'success') {
      console.error("Data not found");
      return;
    }

    return body;
  };

  const deletePembelian = async (data: number): Promise<ApiResponse<any> | undefined> => {
    const response = await axios.delete<ApiResponse<any>>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pembelian/${data}`);

    const body = response.data;

    if (body.status !== 'success') {
      console.error("Data not found");
      return;
    }

    return body;
  };

  return {
    login,
    register,
    createShop,
    getShop,
    updateShop,
    deleteShop,
    getProduk,
    createProduk,
    updateProduk,
    deleteProduk,
    getPembelian,
    createPembelian,
    updatePembelian,
    deletePembelian,
  };
})();
