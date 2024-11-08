export interface Category {
  _id: string;
  categoryName: string;
  categoryImage: string;
  sortNumber: number;
}

export interface ApiResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    categories: Category[];
    count: number;
    hasNext: boolean;
  };
}

