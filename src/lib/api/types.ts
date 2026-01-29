// DTOs matching the backend
export interface ProductDto {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  imageUrl: string | null;
}

export interface CartItemDto {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  customerEmail: string;
  items: CartItemDto[];
}

export interface OrderDto {
  id: string;
  status: string;
  totalAmount: number;
}

// Frontend-specific types
export interface CartItem extends ProductDto {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}
