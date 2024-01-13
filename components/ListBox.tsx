'use client';
import {Listbox, ListboxItem} from "@nextui-org/listbox";
import {CacheProduct, Product} from "@/interfaces/supabaseData";
import {useServerContext} from "@/app/provider";
import {addProduct, getProductsStore} from "@/utils/storage";

interface Props {
  clear: () => void
  productsFiltered: Product[]
}

export default function ListProductsFiltered({productsFiltered, clear}: Props) {
  const { setProductsCart } = useServerContext()

  const handleClick = (item: Product) => {
    const cacheObj: CacheProduct = {
      id: item.id_alegra,
      name: item.name,
      quantity: 0.5,
      price: item.price,
      observation: '',
      description: ''
    }

    addProduct(cacheObj)
    const cacheProducts = getProductsStore();
    setProductsCart(cacheProducts)
    clear()
  }

  return (
    <div
      className="w-full border-small px-1 py-2 bg-white text-secondary rounded-small border-default-300 dark:border-default-100 z-10"
      style={{ maxWidth: 'calc(100% - 32px)', maxHeight: 150, overflow: "auto", position: "absolute"}}>
      <Listbox
        aria-label="Lista de productos"
        variant="solid"
        items={productsFiltered}
      >
        {(item) => (
          <ListboxItem key={item.id_alegra} className="px-2" onClick={() => handleClick(item)} textValue={item.name}>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                {item.name}
                <span className="text-tiny text-default-600">${item.price}</span>
                <div className="flex gap-2 text-tiny">
                  <span className="text-default-500">Gramo a</span>
                  <span className="text-success">${(Math.ceil(Number(item.price ?? 0) / 1000))}</span>
                </div>
              </div>

              <button
                onClick={() => handleClick(item)}
                aria-label="Agregar"
                className="bg-transparent hover:bg-primary text-primary font-semibold hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded-2xl"
              >
                Agregar
              </button>
            </div>
            <div className="w-full p-[1px] mt-2 bg-neutral-400"/>
          </ListboxItem>
        )}
      </Listbox>
    </div>

  );
}
