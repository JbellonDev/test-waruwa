'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import {deleteOneProduct, getProductsStore} from "@/utils/storage";
import {useServerContext} from "@/app/provider";




export default function DeleteItemButton({ id }: { id: number }) {
  const { setProductsCart } = useServerContext()
  const handleClick = () => {
    deleteOneProduct(id)
    const products = getProductsStore()
    setProductsCart(products)
  }

  return (
    <button
      type="submit"
      onClick={handleClick}
      aria-label="Eliminar Prducto"
      className="ease flex h-[25px] w-[25px] items-center justify-center transition-all duration-200"
    >
      <TrashIcon className="hover:text-accent-3 mx-[1px] h-6 w-6 text-danger"/>
    </button>
  );
}