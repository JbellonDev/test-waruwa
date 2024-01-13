import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Cart from "@/components/Cart/Cart";
import {Contact, Product} from "@/interfaces/supabaseData";
import {desencryptHash} from "@/utils/helpers";
import {Spinner} from "@nextui-org/spinner";
import {urlToRedirect} from "@/constants/global";
import {PostgrestError} from "@supabase/supabase-js";
import ErrorUser from "@/components/ErrorUser";

interface Props {
  params: {};
  searchParams: PropsParams
}

interface PropsParams {
  id: string
}
export default async function Shopping({searchParams}: Props) {
  const cookieStore = cookies()
  //get Supabase
  const supabase = createClient(cookieStore);
  //Get environments
  const {IV, SECRET_WORD, TOKEN_ALEGRA} = process.env

  const id = desencryptHash(searchParams.id ?? '', SECRET_WORD!, IV!)
  const {data: contact, error}: { data: Contact[] | null, error: PostgrestError | null } = await supabase.from("alegra_contacts").select('*').eq('id_contact', id);

  //Return Component error when obtain supabase error
  if(error) return <ErrorUser msg="Ha ocurrido un error cuando intentamos traer los datos." url={urlToRedirect} />
  if (!contact) return <Spinner size="lg" color="primary" />
  if(!contact.length) return <ErrorUser msg="No hemos encontrado el usuario, por favor contactanos para registrarte" url={urlToRedirect} />


  const {data: products, error: productError}: { data: Product[] | null, error: PostgrestError | null } = await supabase.rpc("get_prices", {price_list: contact[0].price_list_id});

  if(productError) return <ErrorUser msg="Ha ocurrido un error cuando intentamos traer los datos." url={urlToRedirect} />
  if (!products) return <Spinner size="lg" color="primary" />

  return <Cart data={products} contactData={contact[0]} token={TOKEN_ALEGRA} />

}