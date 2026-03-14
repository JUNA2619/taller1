import { Product } from './productTypes';

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  return data as Product[];
};