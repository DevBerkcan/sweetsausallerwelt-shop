import { ProductDto, CreateOrderDto, OrderDto } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5044';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, `API Error: ${response.statusText}`);
  }

  return response.json();
}

// ============ Products API ============

export async function getProducts(): Promise<ProductDto[]> {
  return fetchApi<ProductDto[]>('/api/products');
}

export async function getProductById(id: string): Promise<ProductDto> {
  return fetchApi<ProductDto>(`/api/products/${id}`);
}

export async function getProductBySlug(slug: string): Promise<ProductDto> {
  return fetchApi<ProductDto>(`/api/products/slug/${slug}`);
}

// ============ Orders API ============

export async function createOrder(orderData: CreateOrderDto): Promise<OrderDto> {
  return fetchApi<OrderDto>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

export async function getOrderById(id: string): Promise<OrderDto> {
  return fetchApi<OrderDto>(`/api/orders/${id}`);
}

export async function markOrderAsPaid(id: string): Promise<OrderDto> {
  return fetchApi<OrderDto>(`/api/orders/${id}/pay`, {
    method: 'POST',
  });
}

// ============ Server-side only functions (for Next.js Server Components) ============

export async function getProductsServer(): Promise<ProductDto[]> {
  'use server';
  const url = `${process.env.API_URL || 'http://localhost:5044'}/api/products`;

  const response = await fetch(url, {
    cache: 'no-store', // Always fetch fresh data
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
}

export async function getProductBySlugServer(slug: string): Promise<ProductDto | null> {
  'use server';
  const url = `${process.env.API_URL || 'http://localhost:5044'}/api/products/slug/${slug}`;

  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }

  return response.json();
}
