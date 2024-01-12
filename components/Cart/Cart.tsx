'use client';

import Search from "@/components/Search";
import {Contact, Product} from "@/interfaces/supabaseData";
import ContentCart from "@/components/Cart/ContentCart";
import {useServerContext} from "@/app/provider";

interface Props {
  data: Product[]
  contactData: Contact,
  token: string | undefined
}

export default function Cart({data, contactData, token}: Props) {
  const {setAllProducts} = useServerContext()
  setAllProducts(data)
  return (
    <div className="w-max-[950px] relative w-full lg:px-14 xl:w-full flex flex-col justify-center p-4">
        <ContentCart contactData={contactData} token={token} />
    </div>
  );
}
