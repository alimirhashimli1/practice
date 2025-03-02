import React, { useEffect } from 'react'
import { useShopContext } from './context/ShopContext'
import CartSummary from './cart/CartSummary';
import ProductCard from './products/ProductCard';
import { ActionType } from './reducers/shopReducer';

const ShopApp = () => {
    const {state, dispatch} = useShopContext();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                dispatch({type: ActionType.FETCH_PRODUCTS_START})
                const response = await fetch("http://localhost:5000/api/products");
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                console.log("Fetched products:", data);
                dispatch({type: ActionType.FETCH_PRODUCTS_SUCCESS, payload: data})
            } catch (error) {
              console.error("Fetch error:", error);
                dispatch({type: ActionType.FETCH_PRODUCTS_ERROR, payload: (error as Error).message})
            }
        }

        fetchProducts();
    }, [dispatch])

if(state.loading) return <p>Loading...</p>;

if(state.error) return <p>{state.error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping App</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.isArray(state.products) ? state.products.map(product => <ProductCard key={product.id} product={product} />) : <p>No products available.</p>}

          </div>
        </div>

        {/* Cart Section */}
        <div className="col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  )
}

export default ShopApp