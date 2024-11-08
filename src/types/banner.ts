export interface Banner {
  _id: string;
  bannerTitle: string;
  bannerImage: string;
  description: string;
  productId: string;
  sortNumber: number;
}

export interface ApiResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Banner[];
}
