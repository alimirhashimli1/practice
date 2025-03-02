import e from "express";

export interface DatabaseConfig {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
}

export interface JwtPayload {
    user_id: number,
    email: string
}

export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    image_url: string,
    category: string,
    created_at: string
}

export interface User {
    id: number,
    email: string,
    created_at: string
}

export interface Order {
    id: number,
    user_id: number,
    total_amount: number,
    status: 'pending' | 'processing' | 'completed' | 'cancelled',
    created_at: string
}