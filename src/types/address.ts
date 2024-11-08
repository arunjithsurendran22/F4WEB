export interface Address {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    latitude: number;
    longitude: number;
    documentStatus: boolean;
    primary:boolean
  }