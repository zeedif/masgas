import {useState, useEffect} from "react";
import "./App.css";
import {getListProduct} from "./services/getListProduct";
import {deleteProduct} from "./services/deleteProduct";
import {updateProduct} from "./services/updateProduct";
import {getProduct} from "./services/getProduct";
import {createProduct} from "./services/createProduct";
import {ListProduct} from "./models/listProduct";
import {Product} from "./models/product";
import {ProductDto} from "./models/productDto";

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

  const handleShowForm = () => {
    setShowForm(!showForm);
    setEditingProduct(null);
  };

  const handleEditProduct = (productId: string) => {
    const productIdNumber = Number(productId);
    getProduct(productIdNumber).then((data) => {
      console.log("Editando producto: ", data);
      if (data) {
        setEditingProduct(data);
        setShowForm(true);
      }
    });
  };

  const handleDeleteProduct = (id: string) => {
    const productId = Number(id);
    deleteProduct(productId).then(() => {
      getListProduct().then((data) => {
        if (data) {
          setProducts(data);
        }
      });
    });
  };

  const handleCreateProduct = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const {name, price, imageUrl, description, stock} = form.elements as any;

    const product = new ProductDto(
      name.value,
      Number(price.value),
      imageUrl.value,
      description.value,
      Number(stock.value)
    );

    createProduct(product).then((newProduct) => {
      if (newProduct) {
        setProducts([...products, {id: products.length + 1, ...product}]);
      }
    });

    setShowForm(false);
  };

  const handleUpdateProduct = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const {name, price, imageUrl, description, stock} = form.elements as any;

    const product = new ProductDto(
      name.value,
      Number(price.value),
      imageUrl.value,
      description.value,
      Number(stock.value)
    );

    if (editingProduct) {
      updateProduct(editingProduct.id, product).then((isUpdated) => {
        if (isUpdated) {
          getListProduct().then((data) => {
            if (data) {
              setProducts(data);
            }
          });
        }
      });
    }

    setShowForm(false);
  };

  return (
    <div className="flex flex-wrap justify-around">
      <button
        onClick={handleShowForm}
        className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        {editingProduct ? "Cancelar edición" : "Crear nuevo producto"}
      </button>
      {showForm ? (
        <form
          className="w-full max-w-sm mx-auto mt-5"
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="name"
                type="text"
                placeholder="Nombre del producto"
                defaultValue={editingProduct ? editingProduct.name : ""}
              />
            </div>
            <div className="w-full px-3">
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="description"
                placeholder="Descripción del producto"
                defaultValue={editingProduct ? editingProduct.description : ""}
              />
            </div>
            <div className="w-full px-3">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="imageUrl"
                type="text"
                placeholder="URL de la imagen del producto"
                defaultValue={editingProduct ? editingProduct.imageUrl : ""}
              />
            </div>
            <div className="w-full px-3">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="price"
                type="number"
                placeholder="Precio del producto"
                defaultValue={editingProduct ? editingProduct.price : ""}
              />
            </div>
            <div className="w-full px-3">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="stock"
                type="number"
                placeholder="Stock del producto"
                defaultValue={editingProduct ? editingProduct.stock : ""}
              />
            </div>
            <div className="w-full px-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                Crear
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imagen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-10 w-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditProduct(product.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2">
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
