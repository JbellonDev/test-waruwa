'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {useDebouncedCallback} from "use-debounce";
import {useState} from "react";
import ListProductsFiltered from "@/components/ListBox";
import {filterData} from "@/utils/search";
import {useServerContext} from "@/app/provider";

export default function Search() {
  const {allProducts} = useServerContext()
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
      const productFiltered = filterData(search, allProducts, 'name');
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
    if(value.length > 1) {
      debouncedOnChange(value)
    }
  }

  return (
    <div className="relative w-[700px] p-4">
      <input
        type="text"
        placeholder="Busca los productos"
        autoComplete="off"
        value={inputValue}
        onChange={onChange}
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500"
      />
      <div className="absolute right-0 top-0 mr-6 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
      {!!products.length
        ? <ListProductsFiltered productsFiltered={products} clear={resetData} />
        : showNoResults && !!inputValue.length && (
          <div
            className="w-full border-small px-4 py-2 bg-white text-secondary rounded-small border-default-300 dark:border-default-100 z-10"
            style={{ maxWidth: 'calc(100% - 32px)', maxHeight: 150, position: "absolute"}}>
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