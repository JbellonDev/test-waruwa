import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

interface Props {
  params: PropsParams;
}

interface  Contact {
  id: number
  price_list_id: number
}

interface PropsParams {
  userid: string
}
export default async function Shopping({params}: Props) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore);
  const {data: contact}: { data: Contact[] | null } = await supabase.from("alegra_contacts").select('*').eq('id', params.userid);
  if (!contact) return <pre>{JSON.stringify(contact, null, 2)}</pre>
  const {data: products} = await supabase.from("alegra_items").select('*');
  const {data: selected} = await supabase.from("alegra_price_items").select('*').eq('id_alegra_item', 1166);

  return <>
    Contact
    <pre>{JSON.stringify(contact, null, 2)}</pre>
    Selected
    <p>{selected?.length}</p>
    <pre>{JSON.stringify(selected, null, 2)}</pre>
    Products
    <p>{products?.length}</p>
    <pre>{JSON.stringify(products, null, 2)}</pre>
  </>

}