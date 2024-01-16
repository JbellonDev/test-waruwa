"use client"

import React, {ReactNode, createContext, useContext, useState} from "react";
import {CacheProduct, Contact, Product} from "@/interfaces/supabaseData";
import {PageStatus} from "@/interfaces/socialInfo";
import {STATUS_PAGE} from "@/constants/global";

const emptyStatus: PageStatus = {
  description: "Ha ocurrido un error cuando intentamos traer los datos",
  status: STATUS_PAGE.ERROR,
  icon: '/error.png',
  title: 'Oh no!',
  button: 'Contactános',
  goTo: '#'
}

interface EmptyContext {
  contact: Contact | undefined;
  productsCart: CacheProduct[];
  allProducts: Product[];
  pageStatus: PageStatus;
  setContact:  React.Dispatch<React.SetStateAction<Contact | undefined>>
  setProductsCart: React.Dispatch<React.SetStateAction<CacheProduct[]>>
  setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>
  setPageStatus: React.Dispatch<React.SetStateAction<PageStatus>>
}

//Context
const AppContext = createContext({} as EmptyContext);

//Provider
function AppContextProvider({ children }: { children: ReactNode }) {
  const [contact, setContact] = useState<Contact>()
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [productsCart, setProductsCart] = useState<CacheProduct[]>([])
  const [pageStatus, setPageStatus] = useState<PageStatus>(emptyStatus)

  return (
    <AppContext.Provider value={{allProducts, productsCart, contact, pageStatus, setAllProducts, setProductsCart, setContact, setPageStatus}}>{children}</AppContext.Provider>
  );
}

export const useServerContext = () => {
  return useContext(AppContext);
};

export function Providers({ children }: { children: ReactNode }) {
  return <AppContextProvider>{children}</AppContextProvider>;
}