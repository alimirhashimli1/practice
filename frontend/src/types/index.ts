export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image_url: string;
    category: string;
    created_at: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface User {
    id: number;
    email: string;
    created_at: string;
}

export interface Order {
    id: number;
    user_id: number;
    total_amount: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    created_at: string;
}

export interface ShopState {
    products: Product[];
    cart: CartItem[];
    loading: boolean;
    error: string | null;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}