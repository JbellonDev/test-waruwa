'use client';

import Search from "@/components/Search";
import React, {createContext, useEffect, useState} from "react";
import {CacheProduct, Contact, Product, ProductPrice} from "@/interfaces/supabaseData";
import ContentCart from "@/components/Cart/ContentCart";
import {createClient} from '@/utils/supabase/client'
import {addProduct, getProductsStore} from "@/utils/storage";
import {AppContextProvider} from "@/components/Context";

interface Props {
  data: Product[]
  contactData: Contact
}

// @ts-ignore
export const ProductContext = createContext();

export default function Cart({data, contactData}: Props) {
  // const [productSelect, setProductSelect] = useState<Product>()
  // const [products, setProducts] = useState<CacheProduct[]>(getProductsStore())
  //
  // useEffect(() => {
  //   const fetchPriceProducts = async () => {
  //     if(productSelect) {
  //       const { data }: { data: ProductPrice[] | null  } = await createClient().from('alegra_price_items').select('*').eq('id_alegra_item', productSelect.id)
  //       if(data) {
  //         let productPrice = data?.find(product => product.id_price_list === contactData.price_list_id )
  //
  //         if(!productPrice && contactData.price_list_id !== 10) {
  //           productPrice = data?.find(product => product.id_price_list === 10)
  //         }
  //
  //         const cacheObj: CacheProduct = {
  //           id: productSelect.id,
  //           name: productSelect.name,
  //           quantity: 0.5,
  //           price: productPrice!.price,
  //           observation: ''
  //         }
  //
  //         addProduct(cacheObj)
  //         const productsCache = getProductsStore()
  //         setProducts(productsCache)
  //       }
  //     }
  //   }
  //
  //   fetchPriceProducts()
  //
  // }, [productSelect]);

  return (
    <div className="w-max-[950px] relative w-full lg:px-14 xl:w-full flex flex-col justify-center p-4">
      <AppContextProvider>
        <Search data={data} />
        {/*<ContentCart products={products} />*/}
      </AppContextProvider>

    </div>
  );
}
