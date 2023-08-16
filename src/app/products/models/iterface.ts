export interface product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}
export interface productCart {
  item: product;
  quantity: number;
}
