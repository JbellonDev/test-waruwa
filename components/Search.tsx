'use client';

import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {useDebouncedCallback} from "use-debounce";
import {useState} from "react";
import ListProductsFiltered from "@/components/ListBox";
import {filterData} from "@/utils/search";
import {useServerContext} from "@/app/provider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
  customClass: string
}

export default function Search({ customClass }: Props) {
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
    } else {
      setProducts([]);
    }
  }

  return (
    <div className="relative max-w-[1000px] w-full">
      <input
        type="text"
        placeholder="Busca tus productos aquí"
        autoComplete="off"
        value={inputValue}
        onChange={onChange}
        className={`w-full rounded-2xl border bg-white p-3 text-sm text-black placeholder:text-stone-700 focus:border-primary focus:outline-primary active:border-primary hover:border-primary ${customClass}`}
      />
      <div className="absolute right-0 top-0 mr-6 flex h-full items-center">
        <FontAwesomeIcon className="text-primary text-xl font-black" icon={faMagnifyingGlass}/>
      </div>
      {!!products.length
        ? <ListProductsFiltered productsFiltered={products} clear={resetData} />
        : showNoResults && !!inputValue.length && (
          <div
            className="w-full border-small px-4 py-2 bg-white text-secondary rounded-small border-default-300 dark:border-default-100 z-10"
            style={{ maxHeight: 150, position: "absolute"}}>
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