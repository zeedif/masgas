import {API_HOST} from "../config";
import {Product} from "../models/product";

export const getProduct = async (id: number): Promise<Product | null> => {
  const response = await fetch(`${API_HOST}/products/${id}`);
  const data = await response.json();

  if (response.ok && !data.error) {
    return data;
  }

  console.error(data.error);
  return null;
};
