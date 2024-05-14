import {API_HOST} from "../config";
import {ListProduct} from "../models/listProduct";

export const getListProduct = async (): Promise<ListProduct[] | null> => {
  const response = await fetch(`${API_HOST}/products`);
  console.log(response);
  const data = await response.json();

  if (response.ok && !data.error) {
    return data;
  }

  console.error(data.error);
  return null;
};
