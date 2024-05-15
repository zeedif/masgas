import { useState } from 'react';
import { ProductDto } from '../models/productDto';

const ProductForm = ({ onSubmit, initialProduct }: { onSubmit: (product: ProductDto) => void; initialProduct?: ProductDto }) => {
  const [product, setProduct] = useState<ProductDto>(initialProduct || {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    stock: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 text-white p-4 rounded-md">
      <label className="block">
        <span className="text-gray-400">Nombre</span>
        <input type="text" name="name" value={product.name} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-400">Precio</span>
        <input type="number" name="price" value={product.price} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-400">Descripción</span>
        <input type="text" name="description" value={product.description} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-400">URL de la imagen</span>
        <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-400">Stock</span>
        <input type="number" name="stock" value={product.stock} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 shadow-sm" />
      </label>
      <button type="submit" className="mt-1 block w-full rounded-md border-gray-600 shadow-sm bg-blue-500 text-white py-2 px-4">Enviar</button>
    </form>
  );
};

export default ProductForm;