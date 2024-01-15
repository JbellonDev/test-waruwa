'use client'
import LogoImage from "@/components/LogoImage";
import {useServerContext} from "@/app/provider";


export default function Footer() {
  const {productsCart} = useServerContext()
  return (
    <>
      {!!productsCart.length && (
        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <LogoImage customClass="" />
        </footer>
      )}
    </>

  )
}
