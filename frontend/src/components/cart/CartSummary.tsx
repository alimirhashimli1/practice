import { useShopContext } from "../context/ShopContext";
import { ActionType } from "../reducers/shopReducer";
import { CartItem } from "../../types";
import React from "react";

const CartSummary: React.FC = () => {
    const {state, dispatch} = useShopContext();

    const handleUpdateQuantity = (itemId:  number, newQuantity: number) => {
        if(newQuantity < 1) {
            dispatch({type: ActionType.REMOVE_FROM_CART, payload: itemId})
        } else {
            dispatch({type: ActionType.UPDATE_CART_QUANTITY, payload: {id: itemId, quantity: newQuantity}})
        }
    }

    const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {state.cart.map((item: CartItem) => (
                <div key={item.id} className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">${Number(item.price).toFixed(2)}</p>                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-200 rounded"
                        >
                            -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-200 rounded"
                        >
                            +
                        </button>
                    </div>
                </div>
            ))}
            <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                </div>
                <button
                    className="w-full mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {/* Implement checkout logic */}}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default CartSummary;