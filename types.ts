
export enum OrderStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}

export enum PaymentMethod {
  COD = 'Cash on Delivery',
  BKASH = 'bKash',
  NAGAD = 'Nagad',
  ROCKET = 'Rocket',
  CARD = 'Debit/Credit Card'
}

export enum PaymentStatus {
  PAID = 'Paid',
  UNPAID = 'Unpaid',
  FAILED = 'Failed'
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  discountPrice?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  isPopular?: boolean;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  address: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  addresses: string[];
  role: 'user' | 'admin';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'order' | 'promo' | 'system';
}
