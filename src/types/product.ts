export interface Product {
  _id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  videoLink: string;
  unit: string;
  quantity: number;
  mrp: number;
  sellingPrice: number;
  discountPercentage: number;
  archived: boolean;
  hasSubProducts: boolean;
  subProducts: string[];
  createdAt: string;
  rating: number;
  ratingCount: number;
  reviewCount: number;
  express: boolean;
  subscriptionProduct: boolean; // Added missing field
  isFavourite: boolean;
  stock: number | null;
}

export interface Plan {
  title: string,
  description: string,
  mrp: number,
  sellingPrice: number,
  discountPercentage: number,
  planType: string,
  durationDays: number,
  store: string
}

export interface ProductResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    products: Product[];
    count: number;
    hasNext: boolean;
    plan: Plan;
    subscribed: boolean
  };
}
