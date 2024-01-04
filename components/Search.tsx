'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {useDebouncedCallback} from "use-debounce";
import {Dispatch, SetStateAction} from "react";

interface Props {
  setProduct: Dispatch<SetStateAction<string>>
}

export default function Search({ setProduct }: Props) {
  const WAIT_TIME = 300

  const onChange = useDebouncedCallback((e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target as HTMLInputElement;

      setProduct(search?.value || '')
  }, WAIT_TIME)

  return (
    <div className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
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
    </div>
  );
}
