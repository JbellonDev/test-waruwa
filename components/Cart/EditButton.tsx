'use client';

import {MinusIcon, PlusIcon} from '@heroicons/react/24/outline';
import {CacheProduct} from "@/interfaces/supabaseData";
import {getProductsStore, setOneProduct} from "@/utils/storage";
import useAppContext from "@/components/Context";

export function EditItemQuantityButton({item, type}: { item: CacheProduct; type: 'plus' | 'minus'; }) {
  const { setProducts } = useAppContext()

  const updateQuantity = () => {
    const quantity = item.quantity
    let result = 0.5;
    if (quantity > 0.5 && type === 'minus') {
      result = quantity - 0.1
    }

    const res = type === 'plus' ? item.quantity + 0.1 : result

    if(res !== quantity) {
      const updatedProduct = {
        ...item,
        quantity: res
      };

      setOneProduct(item.id, updatedProduct)
      const products = getProductsStore()
      setProducts(products)
    }
  }


  return (
    <div
      className="hover:cursor-pointer ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 select-none"
      onClick={updateQuantity}>
      {type === 'plus' ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500"/>
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500"/>
      )}
    </div>
  );
}
