import React from 'react';
import { rupiah } from '@/utils/rupiah';

interface Purchase {
  id: number;
  totalHarga: number;
  totalBarang: number;
  product: {
    id: number;
    namaBarang: string;
    img?: string;
    asal: string;
  };
}

interface Props {
  pembelian: Purchase[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (purchase: Purchase) => void;
}

const Table: React.FC<Props> = ({ pembelian, onEdit, onDelete, onView }) => {
  const ProductImage: React.FC<{ purchase: Purchase }> = ({ purchase }) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''; // Ambil URL dasar dari variabel lingkungan
    const imageUrl = purchase?.product?.img ? `${baseUrl}/storage/${purchase?.product?.img}` : "/default-image.jpg";

    return <img src={imageUrl} alt={purchase?.product?.namaBarang || "Product"} width={50} height={50} />;
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between my-2'>
        <h2 className="text-xl font-bold mb-2">Pembelian</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-200">Aksi</th>
              <th className="px-4 py-2 border-b border-gray-200">Gambar</th>
              <th className="px-4 py-2 border-b border-gray-200">Nama Produk</th>
              <th className="px-4 py-2 border-b border-gray-200">Total Harga</th>
              <th className="px-4 py-2 border-b border-gray-200">jumlah Barang</th>
              <th className="px-4 py-2 border-b border-gray-200">Asal Barang</th>
            </tr>
          </thead>
          <tbody>
            {pembelian?.length > 0 && pembelian?.map((a) => (
              <tr key={a.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b border-gray-200">
                  <button
                    onClick={() => onView(a)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => onDelete(a.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Retur
                  </button>
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <ProductImage purchase={a} />
                </td>
                <td className="px-4 py-2 border-b border-gray-200">{a?.product?.namaBarang}</td>
                <td className="px-4 py-2 border-b border-gray-200">{rupiah(a?.totalHarga)}</td>
                <td className="px-4 py-2 border-b border-gray-200">{a?.totalBarang}</td>
                <td className="px-4 py-2 border-b border-gray-200">{a?.product?.asal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
