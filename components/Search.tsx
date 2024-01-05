'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {useDebouncedCallback} from "use-debounce";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import ListProductsFiltered from "@/components/ListBox";
import {Listbox, ListboxItem} from "@nextui-org/listbox";
import {filterData} from "@/utils/search";

interface Props {
  setSelectProduct: Dispatch<SetStateAction<string>>
  data: any[]
}

export default function Search({ setSelectProduct, data }: Props) {
  const [products, setProducts] = useState<any[]>([])
  const WAIT_TIME = 300

  const onChange = useDebouncedCallback((e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target as HTMLInputElement;

    if(search?.value) {
      const productFiltered = filterData(search.value, data, 'name')
      setProducts(productFiltered)
    } else {
      setProducts([])
    }
  }, WAIT_TIME)

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Busca los productos"
        autoComplete="off"
        onChange={onChange}
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
      {!!products.length && <ListProductsFiltered productsFiltered={products}/>}
    </div>
  );
}
