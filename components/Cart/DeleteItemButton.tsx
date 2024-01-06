'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import {deleteOneProduct, getProductsStore} from "@/utils/storage";
import useAppContext from "@/components/Context";


export default function DeleteItemButton({ id }: { id: number }) {
  const { setProducts } = useAppContext()
  const handleClick = () => {
    deleteOneProduct(id)
    const products = getProductsStore()
    setProducts(products)
  }

  return (
    <button
      type="submit"
      onClick={handleClick}
      aria-label="Eliminar Prducto"
      className={'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200'}
    >
      <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black"/>
    </button>
  );
}
