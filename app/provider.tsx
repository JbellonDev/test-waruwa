"use client"

import React, {ReactNode, createContext, useContext, useState} from "react";
import {CacheProduct, Contact, Product} from "@/interfaces/supabaseData";

interface EmptyContext {
  contact: Contact | undefined;
  productsCart: CacheProduct[];
  allProducts: Product[];
  setContact:  React.Dispatch<React.SetStateAction<Contact | undefined>>
  setProductsCart: React.Dispatch<React.SetStateAction<CacheProduct[]>>
  setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

//Context
const AppContext = createContext({} as EmptyContext);

//Provider
function AppContextProvider({ children }: { children: ReactNode }) {
  const [contact, setContact] = useState<Contact>()
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [productsCart, setProductsCart] = useState<CacheProduct[]>([])

  return (
    <AppContext.Provider value={{allProducts, productsCart, contact, setAllProducts, setProductsCart, setContact}}>{children}</AppContext.Provider>
  );
}

export const useServerContext = () => {
  return useContext(AppContext);
};

export function Providers({ children }: { children: ReactNode }) {
  return <AppContextProvider>{children}</AppContextProvider>;
}