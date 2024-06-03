'use client'

import Button from '@/components/Button';
import Input from '@/components/Input';
import { api } from '@/utils/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    const response = await api.login(formData);
    if (response?.status === 'success') {
      localStorage.setItem('token', response?.data.token);
      localStorage.setItem('role', response?.data.role);
      localStorage.setItem('shop', response?.data.shop?.id || '');
      router.push('/home');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
          <h6 className="text-center text-[12px] font-bold mb-4">
            Belum Punya Akun?
            <Link legacyBehavior href="/register">
              <a className="text-blue-500 p-2 rounded block">Buat Akun</a>
            </Link>
          </h6>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="flex items-center justify-between">
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
