import { useState, useEffect } from "react";
import "./App.css";
import { getListProduct } from "./services/getListProduct";
import { deleteProduct } from "./services/deleteProduct";
import { updateProduct } from "./services/updateProduct";
import { getProduct } from "./services/getProduct";
import { createProduct } from "./services/createProduct";
import { ListProduct } from "./models/listProduct";
import { Product } from "./models/product";
import { ProductDto } from "./models/productDto";
import ProductTable from "./component/ProductTable";
import ProductForm from "./component/ProductForm";

function App() {
  const [products, setProducts] = useState<ListProduct[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    getListProduct().then((data) => {
      if (data) {
        setProducts(data);
      }
    });
  }, []);

  const handleFormSubmit = async (product: ProductDto) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, product);
      setEditingProduct(null);
    } else {
      await createProduct(product);
    }

    const newProducts = await getListProduct();
    if (newProducts) {
      setProducts(newProducts);
    }
    setShowForm(false);
  };


  const handleEditClick = (product: ListProduct) => {
    getProduct(product.id).then((data) => {
      if (data) {
        setEditingProduct(data);
        setShowForm(true);
      }
    });
  };

  const handleDeleteClick = async (product: ListProduct) => {
    await deleteProduct(product.id);
    const newProducts = await getListProduct();
    if (newProducts) {
      setProducts(newProducts);
    }
  }

  return (
    <div className="bg-gray-800 h-screen p-4 text-white">
      <h1 className="text-4xl mb-4">Lista de productos</h1>
      {showForm ? (
        <>
          <button onClick={() => { setShowForm(false); setEditingProduct(null); }} className="mb-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
          <ProductForm onSubmit={handleFormSubmit} initialProduct={editingProduct || undefined} />
        </>
      ) : (
        <>
          <button onClick={() => setShowForm(true)} className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Agregar producto</button>
          <ProductTable products={products} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
        </>
      )}
    </div>
  );
}

export default App;
