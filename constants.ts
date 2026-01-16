
import { Product, User } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Wireless Noise Cancelling Headphones',
    category: 'Electronics',
    subCategory: 'Audio',
    price: 350,
    discountPrice: 299,
    stock: 15,
    rating: 4.8,
    reviewCount: 124,
    images: ['https://picsum.photos/seed/audio1/800/800', 'https://picsum.photos/seed/audio2/800/800'],
    description: 'Experience premium sound quality with industry-leading noise cancellation technology.',
    isPopular: true,
    createdAt: '2023-10-01'
  },
  {
    id: 'p2',
    name: 'Minimalist Leather Watch',
    category: 'Fashion',
    subCategory: 'Accessories',
    price: 120,
    discountPrice: 85,
    stock: 30,
    rating: 4.5,
    reviewCount: 56,
    images: ['https://picsum.photos/seed/watch1/800/800'],
    description: 'A timeless piece for the modern individual. genuine leather strap and stainless steel case.',
    createdAt: '2023-11-15'
  },
  {
    id: 'p3',
    name: 'Ultra-Wide Curved Gaming Monitor',
    category: 'Electronics',
    subCategory: 'Computing',
    price: 899,
    stock: 5,
    rating: 4.9,
    reviewCount: 89,
    images: ['https://picsum.photos/seed/monitor/800/800'],
    description: 'Immerse yourself in breathtaking visuals with this 34-inch ultra-wide gaming display.',
    isPopular: true,
    createdAt: '2023-12-01'
  },
  {
    id: 'p4',
    name: 'Organic Cotton Summer Tee',
    category: 'Fashion',
    subCategory: 'Apparel',
    price: 45,
    discountPrice: 25,
    stock: 100,
    rating: 4.2,
    reviewCount: 210,
    images: ['https://picsum.photos/seed/tee/800/800'],
    description: 'Stay cool and comfortable with our 100% organic cotton breathable t-shirt.',
    createdAt: '2024-01-10'
  },
  {
    id: 'p5',
    name: 'Smart Home Hub v3',
    category: 'Electronics',
    subCategory: 'Smart Home',
    price: 199,
    stock: 25,
    rating: 4.7,
    reviewCount: 45,
    images: ['https://picsum.photos/seed/hub/800/800'],
    description: 'Control your entire home with your voice or smartphone using this advanced hub.',
    createdAt: '2024-02-14'
  }
];

export const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports'];

export const MOCK_ADMIN_USER: User = {
  id: 'admin1',
  name: 'Mugdho Admin',
  email: 'admin@luxe.com',
  phone: '0123456789',
  addresses: ['Dhaka, Bangladesh'],
  role: 'admin'
};
