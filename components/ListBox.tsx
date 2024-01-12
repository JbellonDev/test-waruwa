'use client';
import {Listbox, ListboxItem} from "@nextui-org/listbox";
import { useEffect, useState} from "react";
import {Product} from "@/interfaces/supabaseData";
import {useServerContext} from "@/app/provider";

interface Props {
  clear: () => void
  productsFiltered: Product[]
}

export default function ListProductsFiltered({productsFiltered, clear}: Props) {
  const { setProductSelect } = useServerContext()
  const [selected, setSelected] = useState<Product>()

  useEffect(() => {
    if(selected) {
      setProductSelect(selected)
      clear()
    }
  }, [selected]);

  return (
    <div
      className="w-full border-small px-1 py-2 bg-secondary text-white rounded-small border-default-300 dark:border-default-100 z-10" style={{ maxHeight: 150, overflow: "auto", position: "absolute"}}>
      <Listbox
        aria-label="Lista de productos"
        color="primary"
        variant="solid"
        items={productsFiltered}
      >
        {(item) => (
          <ListboxItem key={item.id} className="px-2" onClick={() => setSelected(item)}>{item.name}</ListboxItem>
        )}
      </Listbox>
    </div>

  );
}
