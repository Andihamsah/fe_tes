'use client'
import Button from '@/components/Button';
import Input from '@/components/Input';
import { api } from '@/utils/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    const response = await api.register(formData);
    if (response?.status === 'success') {
      localStorage.setItem('token', response?.data.token);
      localStorage.setItem('role', response?.data.role[0].name);
      localStorage.setItem('shop', '');
      router.push('/home');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
          <h6 className="text-center text-[12px] font-bold mb-4">Sudah Punya Akun?
            <Link legacyBehavior href="/login">
              <a className="text-blue-500 p-2 rounded block">Login Sekarang</a>
            </Link>
          </h6>
          <Input
            label="Nama"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
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
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <div className="flex items-center justify-between">
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
