'use client'
import LogoImage from "@/components/LogoImage";
import Search from "@/components/Search";
import {useServerContext} from "@/app/provider";
import HeaderWithImage from "@/components/Headers/HeaderImage";

export default function Header() {
  const {productsCart} = useServerContext()

  return (
    <>
      {productsCart.length ? (
        <div className="h-[140px] sm:h-[150px]">
          <div className="h-[140px] px-[20px] sm:h-[150px] flex flex-wrap gap-x-[50px] items-center fixed top-0 left-0 w-full z-40 bg-primary justify-center">
            <LogoImage customClass="h-[50px] lg:h-[70px]"/>
            <Search customClass="xl:py-4 xl:px-5 xl:text-lg"/>
          </div>
        </div>
      ) : (
        <HeaderWithImage>
          <Search customClass="sm:py-4 sm:px-5 sm:text-lg"/>
        </HeaderWithImage>
      )}
    </>
  )
}
