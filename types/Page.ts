export interface Page {
  _id: string;
  _type: string;
  title: string;
  slug: {
    current: string;
  };
  content: Array<{
    _key: string;
    _type: string;
    children: Array<{
      _key: string;
      _type: string;
      marks: string[];
      text: string;
    }>;
    markDefs: any[];
    style: string;
  }>;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}