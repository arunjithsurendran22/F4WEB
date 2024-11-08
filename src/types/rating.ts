export interface RatingApiResponse {
    status: boolean;
    statusCode: number;
    message: string;
    data: {
        testimonials: Rating[];
    } | null
  }
  
  export interface Rating {
    _id: string,
    name: string,
    imageUrl: string,
    rating: number,
    review: string
  }