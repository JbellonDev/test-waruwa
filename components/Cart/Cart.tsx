'use client';

import {Contact, Product} from "@/interfaces/supabaseData";
import {useServerContext} from "@/app/provider";
import {useEffect} from "react";
import {clearProductsStore, getProductsStore} from "@/utils/storage";
import EmptyCart from "@/components/Cart/EmptyCart";
import ItemCart from "@/components/Cart/ItemCart";
import Price from "@/components/Cart/Price";
import {addDaysToDate, formatDate} from "@/utils/helpers";
import {createRemission} from "@/utils/fetchAllegra";

interface Props {
  data: Product[]
  contactData: Contact,
  token: string | undefined
}

export default function Cart({data, contactData, token}: Props) {
  const { contact, productsCart, setProductsCart, setAllProducts, setContact } = useServerContext()

  const handleClick = async () => {

    // Obtener la fecha actual
    const currentDate = new Date()
    const dueDate = addDaysToDate(1, currentDate)

    if(!contact?.id) return

    const dataToSend = {
      "documentName": "remission",
      "client": {
        "id": contact.id_contact
      },
      "priceList": {
        "id": contact.price_list_id
      },
      "warehouse": {
        "id": 5
      },
      "date": `${formatDate(dueDate)}`,
      "dueDate": `${formatDate(dueDate)}`,
      "items": productsCart
    }

    try {
      const response = await createRemission(dataToSend, token!)
      const data = await response.json()
      console.warn(data)
      clearProductsStore(contact.id)
      setProductsCart([])
    } catch (e) {
      console.error(e)
    }
  }

  const getTotal = (): number => {
    return productsCart.reduce(
      (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
      0,
    );
  }

  useEffect(() => {
    setContact(contactData)
    const cartProducts = getProductsStore(contactData.id)
    setProductsCart(cartProducts)
    setAllProducts(data)
  }, []);

  return (
    <div className="w-max-[950px] relative w-full lg:px-14 xl:w-full flex flex-col justify-center p-4">
      <div className="flex h-full w-full flex-col p-6 text-black backdrop-blur-xl">
        {productsCart.length === 0 ? (<EmptyCart/>) : (
          <div className="flex h-full flex-col justify-between overflow-hidden p-1">
            <ul className="flex-grow overflow-auto py-4">
              {productsCart.map(item => (
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
              <div
                className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
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
              Haz tu Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
