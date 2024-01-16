'use client'
import LogoImage from "@/components/LogoImage";
import Search from "@/components/Search";
import {useServerContext} from "@/app/provider";
import bg from "@/public/bgFruits.png"
import HeaderWithImage from "@/components/Headers/HeaderImage";
import { OrderCard } from "./card/Card"

export default function Header() {
  const {productsCart} = useServerContext()
  const stylesClassName = `${productsCart.length ? 'h-[94px] bg-primary' : ``}`

  return (
    <>
      {productsCart.length ? (
        <div className="flex flex-col gap-4 items-center fixed top-0 left-0 w-full z-40 bg-white">
          <div className="flex w-full gap-8 justify-around items-center pt-4">
            <LogoImage size="sm"/>
            <Search />
            <div></div>
          </div>
        </div>
      ) : (
        <HeaderWithImage >
          <OrderCard remissionNumber={""} />
          {/* <Search/> */}
        </HeaderWithImage>
      )}
    </>
  )
}
