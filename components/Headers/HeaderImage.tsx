'use client'
import LogoImage from "@/components/LogoImage";
import {ReactNode} from "react";

interface Props {
  children: ReactNode
}

export default function HeaderWithImage({children}: Props) {

  return (
    <div className="min-h-[50%] relative">
      <div className="absolute w-full h-full bg-[#00000099]"/>
      <div
        className="bg-[url('../public/bgFruits.png')] bg-cover w-full h-full flex flex-col gap-[30px] xl:gap-16 justify-between items-center py-[5%] px-4 xl:px-7 sm:py-[3%]">
        <LogoImage customClass="h-[3.75rem] sm:h-[5rem]"/>
        <div className="flex flex-col gap-4 sm:gap-7 z-10 items-center">
          <div className="w-auto leading-[0] py-2 px-4 bg-primary text-white xl:px-[1.3rem] xl:py-[0.75rem] text-center">
              <span
                className="uppercase leading-[normal] text-[0.65rem] tracking-[0.0225rem] font-semibold text-center xl:text-lg lg:tracking-[0.1125rem] lg:leading-[normal] xl:leading-[normal]">
              Donde la calidad se encuentra con la pureza
            </span>
          </div>
          <h4 className="w-[18rem] text-center m-0 font-extrabold text-white sm:w-auto lg:text-[2.1875rem]">
            Descubre nuestra selección de productos orgánicos
          </h4>
        </div>
        {children}
      </div>
    </div>
  )
}
