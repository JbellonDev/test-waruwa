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
  const { contact, setProductsCart } = useServerContext()

  const getImage = (url: string | null) => {
    let result = (url && url.length) ? url : '/icon_default.png'
    return result
  }

  const handleClick = (item: Product) => {
    const cacheObj: CacheProduct = {
      id: item.id_alegra,
      name: item.name,
      quantity: 0.5,
      price: item.price,
      observation: '',
      description: '',
      image: getImage(item.image_url)
    }

    const id = contact?.id ?? ''
    addProduct(cacheObj, id)
    const cacheProducts = getProductsStore(id);
    setProductsCart(cacheProducts)
    clear()
  }

  return (
    <div
      className="w-full border-small px-1 py-2 bg-white text-secondary rounded-small border-default-300 dark:border-default-100 z-10"
      style={{ maxHeight: 360, overflow: "auto", position: "absolute"}}>
      <Listbox
        aria-label="Lista de productos"
        variant="light"
        items={productsFiltered}
      >
        {(item) => (
          <ListboxItem key={item.id_alegra} className="mb-[10px] py-0 hover:bg-transparent"
                       onClick={() => handleClick(item)} textValue={item.name}>
            <div className="flex justify-between items-center">
              <div className="flex gap-[8px] max-w-[60%]" >
                <img src={getImage(item.image_url)} alt={item.name}
                     className="object-cover w-[60px] h-[60px] sm:w-[70px] sm:h-[70px]" />
                <div className="flex flex-col gap-[0.2rem] sm:gap-[0.3rem]">

                  <span className="text-[#555] text-[14px] sm:text-[16px] font-semibold">{item.name}</span>
                  <span className="text-primary text-[14px] sm:text-[16px] font-bold">${item.price}</span>
                  <span
                    className="text-[#888] text-[11px] sm:text-[13px]">Gramo a ${(Math.ceil(Number(item.price ?? 0) / 1000))}</span>
                </div>
              </div>

              <button
                onClick={() => handleClick(item)}
                aria-label="Agregar"
                className="bg-transparent text-[10px] hover:bg-primary text-primary font-bold hover:text-white py-[4px] px-[20px] border border-primary hover:border-transparent rounded-[40px] self-end mb-2 sm:py-[8px] sm:px-[24px] sm:text-[14px]"
              >
                Agregar
              </button>
            </div>
            <div className="w-full p-[1px] mt-[10px] bg-[#EAEAEA]"/>
          </ListboxItem>
        )}
      </Listbox>
    </div>

  );
}
