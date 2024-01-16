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
import {DONE_CARD_INFO, ERROR_CARD_INFO, STATUS_PAGE} from "@/constants/global";

interface Props {
  data: Product[]
  contactData: Contact,
  token: string | undefined
}

export default function Cart({data, contactData, token}: Props) {
  const { contact, productsCart, pageStatus, setProductsCart, setAllProducts, setContact, setPageStatus } = useServerContext()

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

      if(data.number) {
        const doneInfo = DONE_CARD_INFO
        doneInfo.remissionNumber = `${data.number}`

        setPageStatus(doneInfo)
        clearProductsStore(contact.id)
        setProductsCart([])
      } else {
        const errorInfo = ERROR_CARD_INFO
        errorInfo.description = data?.message ?? ERROR_CARD_INFO.description

        console.log(data)
        setPageStatus(errorInfo)
      }



    } catch (e) {
      const errorInfo = ERROR_CARD_INFO

      console.log(e)
      setPageStatus(errorInfo)
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
      <div className="flex h-full w-full flex-col">
        {(productsCart.length) ? (
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
        ) : pageStatus.status == STATUS_PAGE.INIT && (<EmptyCart/>)}
      </div>
    </div>
  );
}
