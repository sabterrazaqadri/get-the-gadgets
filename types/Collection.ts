import { Product } from './Product';

export interface Collection {
  _id: string;
  _type: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  heroImage: {
    _key?: string;
    _ref: string;
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  linkedProducts: Product[];
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}