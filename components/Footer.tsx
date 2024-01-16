'use client'

import {useServerContext} from "@/app/provider";
import clsx from "clsx";
import {SocialInfoIcon} from "@/constants/socialIcons";
import SocialIcons from "@/components/Social/SocialIcons";


export default function Footer() {
  const {productsCart} = useServerContext()
  return (
    <>
      {!!productsCart.length && (
        <footer
          className="hidden sm:flex max-w-[1170px] w-full m-0 mx-auto sm:w-full px-[16px] sm:px-8 xl:px-0 py-[28px]">
          <img src="/Logo%20Waruwa%20-%20Naranja.svg" alt="Waruwa Logo"
               className={clsx('z-10 h-[40px]')}
          />

          <div className="mx-[25px] w-[1px] h-[35px] bg-[#0000001A]" />

          <div className="flex gap-x-[10px]">
            {SocialInfoIcon.map(social => (
              <SocialIcons {...social} key={social.id}/>
            ))}
          </div>


          <img src="/logo_Waruwa_gris.png" alt="Waruwa Logo"
               className={clsx('hidden absolute z-[0] h-[220px] bottom-0 right-0 sm:block')}
          />
        </footer>
      )}
    </>

  )
}
