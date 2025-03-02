import { useShopContext } from "../context/ShopContext";
import { Product } from "../../types";
import { ActionType } from "../reducers/shopReducer";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    const {dispatch} = useShopContext();

    const handleAddToCart = () => {
        dispatch({type: ActionType.ADD_TO_CART, payload: product});
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img 
            className="w-full h-48 object-cover"
            src={product.image_url} 
            alt={product.name}
        />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{product.name}</div>
            <p className="text-gray-700 text-base">
                {product.description}
            </p>
            <div className="mt-4">
                <span className="text-xl font-bold">
                ${Number(product.price).toFixed(2)}
                </span>
                <button
                    onClick={handleAddToCart}
                    className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
    )
}

export default ProductCard;