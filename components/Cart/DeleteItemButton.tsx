'use client';

import {deleteOneProduct, getProductsStore} from "@/utils/storage";
import {useServerContext} from "@/app/provider";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";




export default function DeleteItemButton({ id }: { id: number }) {
  const { contact, setProductsCart } = useServerContext()
  const handleClick = () => {
    const idContact = contact?.id ?? ''
    deleteOneProduct(id, idContact)
    const products = getProductsStore(idContact)
    setProductsCart(products)
  }

  return (
      <FontAwesomeIcon onClick={handleClick} className="text-xl text-[#E94237]" icon={faTrashCan}/>
  );
}