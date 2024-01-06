import React, {useContext, createContext, useState} from 'react';
import {CacheProduct, Product} from "@/interfaces/supabaseData";

interface EmptyContext {
  productSelect: Product | undefined;
  products: CacheProduct[];
  setProductSelect: React.Dispatch<React.SetStateAction<Product | undefined>>;
  setProducts: React.Dispatch<React.SetStateAction<CacheProduct[]>>
}

//Context
export const AppContext = createContext({} as EmptyContext);

//Provider
export const AppContextProvider = ({children}: { children: React.ReactNode }) => {
  const [productSelect, setProductSelect] = useState<Product>()
  const [products, setProducts] = useState<CacheProduct[]>([])


  const values = React.useMemo(() => ({productSelect, products, setProductSelect, setProducts}),
    [products, productSelect]);


  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

//
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    console.error('Error deploying App Context!!!');
  }

  return context;
}

export default useAppContext;