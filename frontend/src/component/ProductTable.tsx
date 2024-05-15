import {ListProduct} from "../models/listProduct";

const ProductTable = ({ products, onEditClick, onDeleteClick }: { products: ListProduct[]; onEditClick: (product: ListProduct) => void; onDeleteClick: (product: ListProduct) => void }) => {
  return ( 
    <table className="w-full text-center border-separate space-y-6 text-sm bg-gray-800 text-white">
      <thead className="bg-gray-700">
        <tr>
          <th className="p-3">Nombre</th>
          <th className="p-3">Precio</th>
          <th className="p-3">Imagen</th>
          <th className="p-3">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: ListProduct) => (
          <tr key={product.id} className="bg-gray-900">
            <td className="p-3">{product.name}</td>
            <td className="p-3">{product.price}</td>
            <td className="p-3">
              <img src={product.imageUrl} alt={product.name} className="h-10" />
            </td>
            <td className="p-3">
              <button onClick={() => onEditClick(product)} className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button>
              <button onClick={() => {onDeleteClick(product);}} className="mr-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
   );
}
 
export default ProductTable;