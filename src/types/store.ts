// types/store.ts

export interface TaxInfo {
    taxNumber: string;
    taxName: string;
    taxRate: number;
    taxType: string; // e.g., "Exclusive"
    state: string;
    _id: string; // MongoDB ID or similar
  }
  
  export interface Location {
    type: string; // e.g., "Point"
    coordinates: [number, number]; // [longitude, latitude]
  }
  
  export interface Store {
    _id: string; // Store ID
    storeName: string; // Name of the store
    storeLocation: string; // Location of the store
    lat: number; // Latitude
    lng: number; // Longitude
    deliveryCharge: number; // Delivery charge
    taxInfo: TaxInfo; // Tax information
    address: string; // Full address
    countryCode: string; // Country code
    mobileNumber: string; // Mobile number of the store
    email: string; // Email of the store owner
    owner: string; // Name of the store owner
  }
  
  export interface StoreResponseData {
    store: Store; // Store details
    distance: number; // Distance to the store
  }
  
  export interface ApiResponse<T> {
    status: boolean; // Status of the request
    statusCode: number; // HTTP status code
    message: string; // Message related to the request
    data: T; // Data returned from the API
  }
  
  // Final type for the Store API response
  export type StoreApiResponse = ApiResponse<StoreResponseData>;
  