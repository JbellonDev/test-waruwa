'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {useDebouncedCallback} from "use-debounce";
import {useState} from "react";
import ListProductsFiltered from "@/components/ListBox";
import {filterData} from "@/utils/search";
import {Product} from "@/interfaces/supabaseData";
import {Listbox, ListboxItem} from "@nextui-org/listbox";

interface Props {
  data: Product[]
}

export default function Search({ data }: Props) {
  const [products, setProducts] = useState<any[]>([])
  const [inputValue, setInputValue] = useState('');
  const [showNoResults, setShowNoResults] = useState(false);

  const WAIT_TIME = 300

  const resetData = () => {
    setInputValue('')
    setProducts([])
  };

  const debouncedOnChange = useDebouncedCallback((search) => {
    if (search) {
      const productFiltered = filterData(search, data, 'name');
      setProducts(productFiltered);
      setShowNoResults(!productFiltered?.length)
    } else {
      setProducts([]);
      setShowNoResults(false)
    }
  }, WAIT_TIME);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target as HTMLInputElement;
    const value = search?.value || ''
    setInputValue(value)
    debouncedOnChange(value)
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Busca los productos"
        autoComplete="off"
        value={inputValue}
        onChange={onChange}
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
      {!!products.length
        ? <ListProductsFiltered productsFiltered={products} clear={resetData} />
        : showNoResults && !!inputValue.length && (
          <div
            className="w-full border-small px-1 py-2 bg-zinc-800 text-white rounded-small border-default-300 dark:border-default-100 z-10"
            style={{maxHeight: 150, textAlign: "center", position: "absolute"}}>
            No se ha encontrado ningún producto
          </div>
        )
      }
    </div>
  );
}


export function NotFoundProduct({waitTime}: { waitTime: number }) {

  return
}