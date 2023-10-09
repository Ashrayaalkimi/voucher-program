export interface Product {
    id: number;
    name: string;
    description: string;
    noOfAlerts: number;
    basePrice: number;
    currency: string;
    status: boolean;
  }

  export interface ProductDetail {
    id: number;
    name: string;
    description: string;
    noOfAlerts: number;
    basePrice: number;
    discount: number;
    discountedPrice: number;
    totalPrice: number;
    currency: string;
    status: boolean;
  }
 