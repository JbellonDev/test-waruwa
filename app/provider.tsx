"use client"

import React, {ReactNode, createContext, useContext, useState} from "react";
import {CacheProduct, Product} from "@/interfaces/supabaseData";

interface EmptyContext {
  productSelect: Product | undefined;
  productsCart: CacheProduct[];
  allProducts: Product[];
  setProductSelect: React.Dispatch<React.SetStateAction<Product | undefined>>;
  setProductsCart: React.Dispatch<React.SetStateAction<CacheProduct[]>>
  setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

//Context
const AppContext = createContext({} as EmptyContext);

//Provider
function AppContextProvider({ children }: { children: ReactNode }) {
  const [productSelect, setProductSelect] = useState<Product>()
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [productsCart, setProductsCart] = useState<CacheProduct[]>([])

  return (
    <AppContext.Provider value={{productSelect, allProducts, productsCart, setProductSelect, setAllProducts, setProductsCart}}>{children}</AppContext.Provider>
  );
}

export const useServerContext = () => {
  return useContext(AppContext);
};

export function Providers({ children }: { children: ReactNode }) {
  return <AppContextProvider>{children}</AppContextProvider>;
}