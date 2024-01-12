'use client';

import {useEffect} from 'react';
import EmptyCart from "@/components/Cart/EmptyCart";
import {CacheProduct, Contact, ProductPrice} from "@/interfaces/supabaseData";
import Price from "@/components/Cart/Price";
import {addProduct, clearProductsStore, getProductsStore} from "@/utils/storage";
import useAppContext from "@/components/Context";
import {createClient} from "@/utils/supabase/client";
import ItemCart from "@/components/Cart/ItemCart";
import {addDaysToDate, formatDate} from "@/utils/helpers";
import {createRemission} from "@/utils/fetchAllegra";

interface Props {
  contactData: Contact
  token: string | undefined
}

export default function ContentCart({ contactData, token }: Props) {
  const { products, productSelect, setProducts } = useAppContext()

  const handleClick = async () => {

    // Obtener la fecha actual
    const currentDate = new Date()
    const dueDate = addDaysToDate(1, currentDate)

    const dataToSend = {
        "documentName": "remission",
        "client": {
          "id": contactData.id_contact
        },
        "priceList": {
          "id": contactData.price_list_id
        },
        "warehouse": {
          "id": 5
        },
        "date": `${formatDate(dueDate)}`,
        "dueDate": `${formatDate(dueDate)}`,
        "items": products
      }

    try {
      const response = await createRemission(dataToSend, token!)
      const data = await response.json()
      console.warn(data)
      clearProductsStore()
      setProducts([])
    } catch (e) {
      console.error(e)
    }




  }

  useEffect(() => {
    const fetchPriceProducts = async () => {
      if(productSelect) {
        const { data }: { data: ProductPrice[] | null  } = await createClient().from('alegra_price_items').select('*').eq('id_alegra_item', productSelect.id_alegra)
        if(data) {
          let productPrice = data?.find(product => product.id_price_list === contactData.price_list_id )

          if(!productPrice && contactData.price_list_id !== 10) {
            productPrice = data?.find(product => product.id_price_list === 10)
          }

          if(!productPrice) productPrice = data[0]

          const cacheObj: CacheProduct = {
            id: productSelect.id,
            name: productSelect.name,
            quantity: 0.5,
            price: productPrice!.price,
            observation: '',
            description: ''
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
    return products.reduce(
      (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
      0,
    );
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
            <button
              onClick={handleClick}
              className="block w-full bg-primary rounded-full p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
            >
              Haz tu compra
            </button>
          </div>
        )}
      </div>
    </>
  );
}
