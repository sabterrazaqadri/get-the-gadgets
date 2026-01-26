export interface Product {
  _id: string;
  _type: string;
  title: string;
  slug: {
    current: string;
  };
  price: number;
  salePrice?: number;
  sizes: string[];
  fabric: string;
  images: Array<{
    _key?: string;
    _ref: string;
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  }>;
  category: string;
  availability: boolean;
  description?: string;
  careInstructions?: string;
  createdAt?: string;
  updatedAt?: string;
}