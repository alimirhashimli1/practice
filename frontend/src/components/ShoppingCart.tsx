import { useReducer, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

type Action =
  | { type: "add"; payload: CartItem }
  | { type: "remove"; payload: { id: number } }
  | { type: "incrementQuantity"; payload: { id: number; amount: number } }
  | { type: "decrementQuantity"; payload: { id: number; amount: number } }
  | { type: "clear" };

const initialState: CartItem[] = [];

function reducer(state: CartItem[], action: Action) {
  switch (action.type) {
    case "add": {
      const existingItem = state.find(item => item.name === action.payload.name);
      if (existingItem) {
        return state.map(item =>
          item.name === action.payload.name ? { ...item, quantity: item.quantity + action.payload.quantity } : item)
      }
      return [...state, action.payload];
    }
    case "incrementQuantity":
        return state.map(item => item.id === action.payload.id ? {...item, quantity: item.quantity + action.payload.amount} : item)
        case "decrementQuantity":
          return state.map(item => item.id === action.payload.id ? {...item, quantity: Math.max(1, item.quantity - action.payload.amount)} : item)
    case "remove":
        return state.filter(item => item.id !== action.payload.id)
        case "clear":
          return [];
    default:
            return state
  }
  

}

const ShoppingCart: React.FC = () => {
  const [cart, dispatch] = useReducer(reducer, initialState);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [itemQuantity, setItemQuantity] = useState<number>(1);

  const handleAddItem = () => {
    if (itemName.trim() && itemPrice > 0) {
      // Dispatch an "add" action here
      dispatch({type: "add", payload: {id: Date.now(), name: itemName, price: itemPrice, quantity: itemQuantity}})
      setItemName("");
      setItemPrice(0);
    }
  };

  return (
    <div>
      <h2>Shopping Cart with useReducer</h2>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Item name..."
      />
      <input
        type="number"
        value={itemPrice}
        onChange={(e) => setItemPrice(Number(e.target.value))}
        placeholder="Price..."
      />
          <input
        type="number"
        value={itemQuantity}
        onChange={(e) => setItemQuantity(Number(e.target.value))}
        placeholder="Price..."
      />
      <button onClick={handleAddItem}>Add to Cart</button>
      <button onClick={() => { dispatch({type: "clear"}) }}>
        Clear Cart
      </button>

      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <button onClick={() => { dispatch({type: "incrementQuantity", payload: {id: item.id, amount: 1}}) }}>
              +
            </button>
            <button onClick={() => { dispatch({type: "decrementQuantity", payload: {id: item.id, amount: 1}}) }}>
              -
            </button>
            <button onClick={() => { dispatch({type: "remove", payload: {id: item.id}})  }}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h3>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
    </div>
  );
};

export default ShoppingCart;
