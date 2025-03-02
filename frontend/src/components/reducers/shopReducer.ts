import { ShopState, Product } from "../../types";

export enum ActionType {
    FETCH_PRODUCTS_START = "FETCH_PRODUCTS_START",
    FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS",
    FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR",
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",
    UPDATE_CART_QUANTITY = "UPDATE_CART_QUANTITY",
    CLEAR_CART = "CLEAR_CART",
}

export type ShopAction =
    | {type: ActionType.FETCH_PRODUCTS_START}
    | {type: ActionType.FETCH_PRODUCTS_SUCCESS; payload: Product[]}
    | {type: ActionType.FETCH_PRODUCTS_ERROR; payload: string}
    | {type: ActionType.ADD_TO_CART; payload: Product}
    | {type: ActionType.REMOVE_FROM_CART; payload: number}
    | {type: ActionType.UPDATE_CART_QUANTITY; payload: {id: number; quantity: number}}
    | {type: ActionType.CLEAR_CART}


export const initialState: ShopState = {
    products: [],
    cart: [],
    loading: false,
    error: null
}

export const shopReducer = (state: ShopState, action:ShopAction): ShopState => {
    switch (action.type) {
        case ActionType.FETCH_PRODUCTS_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case ActionType.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case ActionType.FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ActionType.ADD_TO_CART: {
            const existingCartItem = state.cart.find(
                item => item.id === action.payload.id
            );

            if(existingCartItem) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                        ? {...item, quantity: item.quantity + 1} : item
                    )
                }
            }

            return {
                ...state,
                cart: [...state.cart, {...action.payload, quantity: 1}]
            }
        
        }
        case ActionType.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            }
        case ActionType.UPDATE_CART_QUANTITY:
            return {
                ...state,
                cart: state.cart.map(item => item.id === action.payload.id ? {...item, quantity: action.payload.quantity} : item         
                )
            }
        case ActionType.CLEAR_CART:
            return {
                ...state,
                cart: []
            }
        default:
            return state
    }
}