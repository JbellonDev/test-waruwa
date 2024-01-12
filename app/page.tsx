import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Cart from "@/components/Cart/Cart";
import {Contact, Product} from "@/interfaces/supabaseData";
import {desencryptHash} from "@/utils/helpers";
import {Spinner} from "@nextui-org/spinner";
import { redirect } from 'next/navigation'
import {urlToRedirect} from "@/constants/global";
import {useServerContext} from "@/app/provider";

interface Props {
  params: {};
  searchParams: PropsParams
}

interface PropsParams {
  id: string
}
export default async function Shopping({searchParams}: Props) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore);
  const token = process.env.TOKEN_ALEGRA
  if(!searchParams.id) { redirect(urlToRedirect) }

  const {IV, SECRET_WORD} = process.env

  const id = desencryptHash(searchParams.id, SECRET_WORD!, IV!)
  const {data: contact, error}: { data: Contact[] | null, error: any } = await supabase.from("alegra_contacts").select('*').eq('id_contact', id);

  if (!contact) return <Spinner size="lg" color="primary" />
  if(!contact.length) { redirect(urlToRedirect) }

  const {data: products}: { data: Product[] | null } = await supabase.from("alegra_items").select('*');

  if (!products) return <Spinner size="lg" color="primary" />

  return <>
    <Cart data={products} contactData={contact[0]} token={token} />
  </>

}