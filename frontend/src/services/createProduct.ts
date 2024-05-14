import {API_HOST} from "../config";
import {ProductDto} from "../models/productDto";

export const createProduct = async (
  createProduct: ProductDto
): Promise<boolean> => {
  const json = JSON.stringify(createProduct);
  const response = await fetch(`${API_HOST}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });
  console.log(json);
  const data = await response.json();

  if (response.ok) {
    return true;
  }

  console.error(data.error);
  return false;
};
