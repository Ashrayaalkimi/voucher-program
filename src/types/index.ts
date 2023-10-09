export interface Product {
  id: number;
  name: string;
  description: string;
  noOfAlerts: number;
  basePrice: number;
  currency: string;
  status: boolean;
}

export interface CheckoutDetails {
  name: string;
  amount: number;
  currency: string;
  quantity: number;
  mode: string;
  success_url: string;
  cancel_url: string;
  email_id: string;
}

export interface Voucher {
  userEmail: string;
  affiliateCode: string | null;
  productId: string | null;
  transactionId: string | number;
  paymentStatus: string;
  paymentMethod: string;
  walletId: string;
  currency: string;
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
