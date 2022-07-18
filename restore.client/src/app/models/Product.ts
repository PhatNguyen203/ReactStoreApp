export default interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type?: string;
  brand?: string;
  quantityInStock?: number;
}
export interface ProductParams {
  sortBy: string;
  searchTerm?: string;
  brands: string[];
  types: string[];
  pageNumber: number;
  size: number;
}
