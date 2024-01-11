'use client';

import {CacheProduct} from "@/interfaces/supabaseData";
import DeleteItemButton from "@/components/Cart/DeleteItemButton";
import Price from "@/components/Cart/Price";
import {useState} from "react";
import {EditQuantity} from "@/components/Cart/EditQuantity";
import useAppContext from "@/components/Context";
import {MIN_QUANTITY} from "@/constants/global";
import {getProductsStore, setOneProduct} from "@/utils/storage";

interface Props extends CacheProduct {}

export default function ItemCart({id, quantity, price, name, observation}: Props) {
  const [inputValue, setInputValue] = useState(observation);
  const { setProducts } = useAppContext()

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target as HTMLInputElement;
    const value = search?.value || ''


    const updatedProduct = {
      id,
      quantity,
      price,
      name,
      observation: value
    };

    setInputValue(value)
    setOneProduct(id, updatedProduct)
    const products = getProductsStore()
    setProducts(products)

  }

  return (
    <>
      <div className="relative flex w-full flex-row justify-between px-1 py-4">
        <div
          className="z-30 flex flex-row space-x-4"
        >
          <div>
            <DeleteItemButton id={id}/>
          </div>
          <div className="flex flex-1 flex-col text-base">
            <span className="leading-tight">
              {name}
            </span>
            <input
              type="text"
              placeholder="Escribe tus observaciones"
              autoComplete="off"
              value={inputValue}
              onChange={handleChange}
              className="w-full mt-2 rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500"
            />
          </div>
        </div>
        <div className="flex h-16 flex-col justify-between">
          <Price
            className="flex justify-end space-y-2 text-right text-sm"
            amount={(price * quantity)}
          />
          <EditQuantity item={{id, quantity, price, name, observation}} />
        </div>
      </div>
    </>
  );
}
