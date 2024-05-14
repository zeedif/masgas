import {API_HOST} from "../config";
import {ProductDto} from "../models/productDto";

export const updateProduct = async (
  id: number,
  product: ProductDto
): Promise<boolean> => {
  const response = await fetch(`${API_HOST}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (response.ok) {
    return true;
  }
  if (response.status !== 204) {
    const data = await response.json();
    console.error(data.error);
  }

  return false;
};
