import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Cart from "@/components/Cart/Cart";

export default async function Index() {
  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center p-4 gap-4">
    </div>
  )
}
