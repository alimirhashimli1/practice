import React, {createContext, useContext, useReducer, ReactNode} from 'react';
import { shopReducer, initialState, ShopAction } from '../reducers/shopReducer';
import { ShopState } from '../../types';


interface ShopContextType {
    state: ShopState;
    dispatch: React.Dispatch<ShopAction>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);


export const ShopProvider:React.FC<{children: ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(shopReducer, initialState);

    return (
        <ShopContext.Provider value={{state, dispatch}}>{children}</ShopContext.Provider>
    )
};


export const useShopContext = () => {
    const context = useContext(ShopContext);
    if(context === undefined) {
        throw new Error("useShopContext must be used within a ShopProvider");
    }
    return context;
}