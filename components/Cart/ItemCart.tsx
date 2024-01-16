'use client';

import {CacheProduct} from "@/interfaces/supabaseData";
import DeleteItemButton from "@/components/Cart/DeleteItemButton";
import Price from "@/components/Cart/Price";
import {useState} from "react";
import {EditQuantity} from "@/components/Cart/EditQuantity";
import {getProductsStore, setOneProduct} from "@/utils/storage";
import {useServerContext} from "@/app/provider";
import commentIcon from "@/public/comment.svg";
import Image from "next/image";

export default function ItemCart({id, quantity, price, name, observation, description, image}: CacheProduct) {
  const [inputValue, setInputValue] = useState(observation);
  const { contact, setProductsCart } = useServerContext()

  const getImage = (url: string | null) => {
    return (url && url.length) ? url : '/icon_default.png'
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target as HTMLInputElement;
    const value = search?.value || ''


    const updatedProduct = {
      id,
      quantity,
      price,
      name,
      observation: value,
      description: value,
      image
    };

    setInputValue(value)
    const idContact = contact?.id ?? ''
    setOneProduct(id, updatedProduct, idContact)
    const products = getProductsStore(idContact)
    setProductsCart(products)

  }

  return (
    <>
      <div className="relative flex w-full items-center gap-[20px] flex-wrap sm:flex-row sm:justify-between px-1 py-4">
        <img src={getImage(image)} alt={name}
             className="object-cover w-[70px] h-[70px]"/>
        <div className="flex flex-1 flex-col gap-y-[14px]">
          <span className="text-[#555] text-[16px] font-semibold leading-normal">
            {name}
          </span>
          <div className="relative max-w-[890px] w-full">
              <input
                type="text"
                placeholder="Escribe tus observaciones aquí"
                autoComplete="off"
                value={inputValue}
                onChange={handleChange}
                className="w-full rounded-2xl border bg-white py-[9px] pr-[20px] pl-[44px] text-sm text-black placeholder:text-[#666] focus:border-primary focus:outline-primary active:border-primary hover:border-primary"
              />
              <div className="absolute left-0 top-0 ml-[20px] flex h-full items-center">
                <Image src={commentIcon} alt="Comment"/>
              </div>
            </div>
        </div>

        <div className="flex w-[calc(100%-40px)] items-center gap-[10px] sm:max-w-[120px] flex-row-reverse sm:w-full sm:flex-col justify-between">
          <Price
            className="flex justify-start text-[16px] sm:text-[14px] text-[#444] leading-[156.25%] sm:leading-[178.57%] tracking-[0.0125rem] font-bold"
            amount={(price * quantity)}
          />
          <EditQuantity item={{id, quantity, price, name, observation, description, image}}/>
        </div>
        <div className="grid place-content-center">
          <DeleteItemButton id={id}/>
        </div>
      </div>
    </>
  );
}
