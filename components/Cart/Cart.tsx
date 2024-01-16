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
  const [remissionNumber, setRemissionNumber] = useState('800')
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
    <div className="max-w-[1170px] m-0 mx-auto relative w-full sm:w-full flex flex-col justify-center px-[16px] sm:px-8 xl:px-0">
      { (!remissionNumber && !hasError) || productsCart.length ? (
        <div className="flex h-full w-full flex-col">
          {productsCart.length === 0 ? (<EmptyCart/>) : (
            <div className="min-h-[calc(100vh-170px)] sm:min-h-0 flex sm:h-full flex-col justify-between overflow-hidden mt-[25px] sm:mt-[60px]">
              <h2 className="text-primary text-[30px] font-bold">Tu orden de pedido:</h2>
              <ul className="flex-grow py-[25px] pb-[152px] sm:py-[40px]">
                {productsCart.map((item, index) => (
                    <li
                      key={item.id}
                      className={`flex mx-auto flex-col ${index != (productsCart.length - 1) ? 'border-b border-[#EAEAEA]' : ''}`}
                    >
                      <ItemCart {...item} />
                    </li>
                  )
                )}
              </ul>
              {/*Total Price*/}
              <div className="absolute custom-shadow bg-white sm:bg-transparent bottom-0 right-0 sm:relative px-[16px] py-[20px] sm:p-0 w-full flex flex-col">
                <div
                  className="flex justify-between sm:border-b sm:border-[#EAEAEA] pb-[14px]">
                  <p className="text-[#555] text-[18px] font-semibold tracking-[0.54px] leading-[normal]">Total</p>
                  <Price
                    className="text-primary leading-[normal] text-[20px] font-semibold"
                    amount={getTotal()}
                  />
                </div>
                <button
                  onClick={handleClick}
                  className="w-full sm:w-auto sm:mt-[15px] bg-primary text-center rounded-[8px] text-white text-[16px] font-bold leading-[125%] px-[24px] py-[12px] self-end z-[1]"
                >
                  Haz tu Pedido
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        hasError ? <ErrorUser msg="" url={urlToRedirect}/> : <DoneRemission remissionNumber={remissionNumber}/>
      )}

    </div>
  );
}
