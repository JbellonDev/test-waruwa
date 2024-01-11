import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Cart from "@/components/Cart/Cart";
import {Contact, Product} from "@/interfaces/supabaseData";

interface Props {
  params: PropsParams;
}

interface PropsParams {
  userid: string
}
export default async function Shopping({params}: Props) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore);
  const token = process.env.TOKEN_ALEGRA
  const {data: contact}: { data: Contact[] | null } = await supabase.from("alegra_contacts").select('*').eq('id', params.userid);

  if (!contact) return <>Loading Contact</>

  const {data: products}: { data: Product[] | null } = await supabase.from("alegra_items").select('*');

  if (!products) return <>Loading Products</>

  return <>
    <Cart data={products} contactData={contact[0]} token={token} />
  </>

}