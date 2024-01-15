'use client';

import {Contact, Product} from "@/interfaces/supabaseData";
import {useServerContext} from "@/app/provider";
import {useEffect, useState} from "react";
import {clearProductsStore, getProductsStore} from "@/utils/storage";
import EmptyCart from "@/components/Cart/EmptyCart";
import ItemCart from "@/components/Cart/ItemCart";
import Price from "@/components/Cart/Price";
import {addDaysToDate, formatDate} from "@/utils/helpers";
import {createRemission} from "@/utils/fetchAllegra";
import ErrorUser from "@/components/ErrorUser";
import {urlToRedirect} from "@/constants/global";
import DoneRemission from "@/components/Cart/Done";

interface Props {
  data: Product[]
  contactData: Contact,
  token: string | undefined
}

export default function Cart({data, contactData, token}: Props) {
  const { contact, productsCart, setProductsCart, setAllProducts, setContact } = useServerContext()
  const [remissionNumber, setRemissionNumber] = useState('')
  const [hasError, setHasError] = useState(false)

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

      setRemissionNumber(data.number)
      clearProductsStore(contact.id)
      setProductsCart([])
    } catch (e) {
      setHasError(true)
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
    <div className="w-max-[950px] relative w-full lg:px-14 xl:w-full flex flex-col justify-center px-4">
      { (!remissionNumber && !hasError) || productsCart.length ? (
        <div className="flex h-full w-full flex-col text-black">
          {productsCart.length === 0 ? (<EmptyCart/>) : (
            <div className="flex h-full flex-col justify-between overflow-hidden p-1">
              <ul className="flex-grow overflow-auto py-4">
                {productsCart.map(item => (
                    <li
                      key={item.id}
                      className="flex w-2/5 mx-auto flex-col border-b border-neutral-300 dark:border-neutral-700"
                    >
                      <ItemCart {...item} />
                    </li>
                  )
                )}
              </ul>
              <div className="py-4 text-base text-neutral-500 dark:text-neutral-400">
                <div
                  className="mb-3 mx-auto w-2/5 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                  <p>Total</p>
                  <Price
                    className="text-right text-base text-black dark:text-white"
                    amount={getTotal()}
                  />
                </div>
              </div>
              <button
                onClick={handleClick}
                className="block mx-auto w-56 bg-primary rounded-xl p-3 text-center text-base font-medium py-5 text-white opacity-90 hover:opacity-100"
              >
                Haz tu Pedido
              </button>
            </div>
          )}
        </div>
      ) : (
        hasError ? <ErrorUser msg="" url={urlToRedirect} /> : <DoneRemission remissionNumber={remissionNumber} />
      )}

    </div>
  );
}
