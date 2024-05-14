import {API_HOST} from "../config";

export const deleteProduct = async (id: number): Promise<boolean> => {
  const response = await fetch(`${API_HOST}/products/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    return true;
  }

  // Solo intenta analizar la respuesta si no está vacía
  if (response.status !== 204) {
    const data = await response.json();
    console.error(data.error);
  }

  return false;
};
