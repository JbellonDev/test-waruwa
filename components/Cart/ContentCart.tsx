'use client';

import {useEffect} from 'react';
import EmptyCart from "@/components/Cart/EmptyCart";
import {CacheProduct, Contact, ProductPrice} from "@/interfaces/supabaseData";
import Price from "@/components/Cart/Price";
import {addProduct, getProductsStore} from "@/utils/storage";
import useAppContext from "@/components/Context";
import {createClient} from "@/utils/supabase/client";
import ItemCart from "@/components/Cart/ItemCart";

interface Props {
  contactData: Contact
}

export default function ContentCart({ contactData }: Props) {
  const { products, productSelect, setProducts } = useAppContext()

  useEffect(() => {
    const fetchPriceProducts = async () => {
      if(productSelect) {
        const { data }: { data: ProductPrice[] | null  } = await createClient().from('alegra_price_items').select('*').eq('id_alegra_item', productSelect.id_alegra)
        if(data) {
          let productPrice = data?.find(product => product.id_price_list === contactData.price_list_id )

          if(!productPrice && contactData.price_list_id !== 10) {
            productPrice = data?.find(product => product.id_price_list === 10)
          }
          const cacheObj: CacheProduct = {
            id: productSelect.id,
            name: productSelect.name,
            quantity: 0.5,
            price: productPrice!.price,
            observation: ''
          }

          addProduct(cacheObj)
          const cacheProducts = getProductsStore();
          setProducts(cacheProducts)
        }
      }
    }

    fetchPriceProducts()

  }, [productSelect]);

  useEffect(() => {
    const cartProducts = getProductsStore()
    setProducts(cartProducts)
  }, []);

  const getTotal = (): number => {
    const sumWithInitial = products.reduce(
      (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
      0,
    );

    return sumWithInitial
  }


  return (
    <>
      <div className="flex h-full w-full flex-col p-6 text-black backdrop-blur-xl">
        {products.length === 0 ? (<EmptyCart />) : (
          <div className="flex h-full flex-col justify-between overflow-hidden p-1">
            <ul className="flex-grow overflow-auto py-4">
              {products.map(item => (
                <li
                  key={item.id}
                  className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                >
                  <ItemCart {...item} />
                </li>
                )
              )}
            </ul>
            <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                <p>Total</p>
                <Price
                  className="text-right text-base text-black dark:text-white"
                  amount={getTotal()}
                />
              </div>
            </div>
            <a
              href="#"
              className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
            >
              Haz tu compra
            </a>
          </div>
        )}
      </div>
    </>
  );
}
