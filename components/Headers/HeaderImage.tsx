'use client'
import LogoImage from "@/components/LogoImage";
import {ReactNode} from "react";

interface Props {
  children: ReactNode
}

export default function HeaderWithImage({children}: Props) {

  return (
    <div className="h-min-[48vh] relative">
      <div className="absolute w-full h-full bg-[#00000099]"/>
      <div
        className="bg-[url('../public/bgFruits.png')] bg-cover w-full h-full flex flex-col gap-12 lg:gap-20 justify-around items-center py-12 px-4 lg:px-7">
        <LogoImage/>
        <div className="flex flex-col gap-7 z-10">
          <div className="m-0 mx-auto px-[1rem] py-[0.5rem] bg-primary text-white lg:px-[1.3rem] lg:py-[0.75rem]">
              <span
                className="uppercase text-xs tracking-[0.0225rem] font-semibold text-center lg:text-lg lg:leading-[normal] lg:tracking-[0.1125rem]">
              Donde la calidad se encuentra con la pureza
            </span>
          </div>
          <h4 className="m-0 font-extrabold text-white lg:text-[2.1875rem]">
            Descubre nuestra selección de productos orgánicos
          </h4>
        </div>
        {children}
      </div>
    </div>
  )
}
