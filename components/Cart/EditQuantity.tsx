'use client';

import {MinusIcon, PlusIcon} from '@heroicons/react/24/outline';
import {CacheProduct} from "@/interfaces/supabaseData";
import {getProductsStore, setOneProduct} from "@/utils/storage";
import useAppContext from "@/components/Context";
import {useState} from "react";
import {MIN_QUANTITY} from "@/constants/global";

const clasNameButton = "hover:cursor-pointer ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 select-none"

function checkMinValue(number: number, minValue: number, type: string) {
  const numberToCheck = Number(number)
  let result = minValue;

  if(isNaN(numberToCheck)) return result

  if(!!type.length) {
    if (numberToCheck > 0.5 && type === 'minus') {
      result = Number((numberToCheck - 0.1).toFixed(1))
    }

    result = type === 'plus' ? Number((numberToCheck + 0.1).toFixed(1)) : result
  } else if (numberToCheck >= 0.5) {
    result = numberToCheck
  }

  return result
}

// "w-full border bg-white px-4 py-2 text-sm text-black"

export function EditQuantity({item}: { item: CacheProduct }) {
  const { setProducts } = useAppContext()
  const [inputValue, setInputValue] = useState(item.quantity);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target as HTMLInputElement;
    const value = Number(search?.value) || MIN_QUANTITY

    updateQuantity('', value)
  }

  const updateQuantity = (type: string, quantity: number = item.quantity) => {
    const result = checkMinValue(quantity, MIN_QUANTITY, type)
console.log((item.quantity !== quantity && !type.length))
    if(result !== quantity || (item.quantity !== quantity && !type.length)) {
      const updatedProduct = {
        ...item,
        quantity: result
      };

      setInputValue(result)
      setOneProduct(item.id, updatedProduct)
      const products = getProductsStore()
      setProducts(products)
    }
  }

  return (
    <div
      className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
      <div
        className={clasNameButton}
        onClick={() => updateQuantity('minus')}>
          <MinusIcon className="h-4 w-4 dark:text-neutral-500"/>
      </div>
      <p className="w-auto max-w-[60px] text-center">
        <input
          type="number"
          onChange={handleChange}
          className="text-center w-full text-base hover md:text-basecursor-default flex items-center outline-none bg-transparent"
          value={inputValue}/>
      </p>
      <div
        className={clasNameButton}
        onClick={() => updateQuantity('plus')}>
          <PlusIcon className="h-4 w-4 dark:text-neutral-500"/>
      </div>
    </div>
  )
}