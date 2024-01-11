'use client';

import Search from "@/components/Search";
import {Contact, Product} from "@/interfaces/supabaseData";
import ContentCart from "@/components/Cart/ContentCart";
import {AppContextProvider} from "@/components/Context";

interface Props {
  data: Product[]
  contactData: Contact,
  token: string | undefined
}

export default function Cart({data, contactData, token}: Props) {
  return (
    <div className="w-max-[950px] relative w-full lg:px-14 xl:w-full flex flex-col justify-center p-4">
      <AppContextProvider>
        <Search data={data} />
        <ContentCart contactData={contactData} token={token} />
      </AppContextProvider>
    </div>
  );
}
