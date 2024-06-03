import { rupiah } from "@/utils/rupiah";
import React from 'react';

interface Product {
  id: number;
  namaBarang: string;
  harga: number;
  asal: string;
  jumlahBarang: number;
  barangTerjual: number;
  rating: number;
  img?: string;
}

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
  onView: (product: Product) => void;
}

const ProductTable: React.FC<Props> = ({ products, onEdit, onDelete, onView }) => {
  const ProductImage: React.FC<{ product: Product }> = ({ product }) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''; // Ambil URL dasar dari variabel lingkungan
    const imageUrl = product?.img ? `${baseUrl}/storage/${product.img}` : "/default-image.jpg";

    return <img src={imageUrl} alt={product?.namaBarang || "Product"} width={50} height={50} />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-200">Aksi</th>
            <th className="px-4 py-2 border-b border-gray-200">Gambar</th>
            <th className="px-4 py-2 border-b border-gray-200">Nama Produk</th>
            <th className="px-4 py-2 border-b border-gray-200">Harga</th>
            <th className="px-4 py-2 border-b border-gray-200">Asal Barang</th>
            <th className="px-4 py-2 border-b border-gray-200">jumlah Barang</th>
            <th className="px-4 py-2 border-b border-gray-200">Barang Terjual</th>
            <th className="px-4 py-2 border-b border-gray-200">Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 && products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b border-gray-200">
                <button
                  onClick={() => onView(product)}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Detail
                </button>
                <button
                  onClick={() => onEdit(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
              <td className="px-4 py-2 border-b border-gray-200">
                <ProductImage product={product} />
              </td>
              <td className="px-4 py-2 border-b border-gray-200">{product?.namaBarang}</td>
              <td className="px-4 py-2 border-b border-gray-200">{rupiah(product?.harga)}</td>
              <td className="px-4 py-2 border-b border-gray-200">{product?.asal}</td>
              <td className="px-4 py-2 border-b border-gray-200">{product?.jumlahBarang}</td>
              <td className="px-4 py-2 border-b border-gray-200">{product?.barangTerjual}</td>
              <td className="px-4 py-2 border-b border-gray-200">{product?.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
