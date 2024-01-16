'use client';

import {MinusIcon, PlusIcon} from '@heroicons/react/24/outline';
import {CacheProduct} from "@/interfaces/supabaseData";
import {getProductsStore, setOneProduct} from "@/utils/storage";
import {useState} from "react";
import {MIN_QUANTITY, VALUE_TO_SUM_SUBTRACT} from "@/constants/global";
import {useServerContext} from "@/app/provider";

const clasNameButton = "hover:cursor-pointer ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 select-none"

function checkMinValue(number: number, minValue: number, type: string) {
  const numberToCheck = Number(number)
  let result = minValue;

  if(isNaN(numberToCheck)) return result

  if(!!type.length) {
    if (numberToCheck > MIN_QUANTITY && type === 'minus') {
      result = Number((numberToCheck - VALUE_TO_SUM_SUBTRACT).toFixed(1))
    }

    result = type === 'plus' ? Number((numberToCheck + VALUE_TO_SUM_SUBTRACT).toFixed(1)) : result
  } else if (numberToCheck >= MIN_QUANTITY) {
    result = numberToCheck
  }

  return result
}

// "w-full border bg-white px-4 py-2 text-sm text-black"

export function EditQuantity({item}: { item: CacheProduct }) {
  const { contact, setProductsCart } = useServerContext()
  const [inputValue, setInputValue] = useState(item.quantity);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target as HTMLInputElement;
    const value = Number(search?.value) || MIN_QUANTITY

    updateQuantity('', value)
  }

  const updateQuantity = (type: string, quantity: number = item.quantity) => {
    const result = checkMinValue(quantity, MIN_QUANTITY, type)

    if(result !== quantity || (item.quantity !== quantity && !type.length)) {
      const updatedProduct = {
        ...item,
        quantity: result
      };

      setInputValue(result)
      const idContact = contact?.id ?? ''
      setOneProduct(item.id, updatedProduct, idContact)
      const products = getProductsStore(idContact)
      setProductsCart(products)
    }
  }

  return (
    <div
      className="w-[100px] m-0 sm:ml-auto flex h-9 flex-row items-center rounded-full border border-[#DEDEDE] sm:w-[120px]">
      <div
        className={clasNameButton}
        onClick={() => updateQuantity('minus')}>
          <MinusIcon className="h-4 w-4 text-[#00000099]"/>
      </div>
      <input
        type="number"
        onChange={handleChange}
        className="text-center text-[#444] text-[14px] w-full hover md:text-basecursor-default flex items-center outline-none bg-transparent"
        value={inputValue}/>
      <div
        className={clasNameButton}
        onClick={() => updateQuantity('plus')}>
          <PlusIcon className="h-4 w-4 text-[#00000099]"/>
      </div>
    </div>
  )
}