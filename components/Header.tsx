'use client'
import LogoImage from "@/components/LogoImage";
import Search from "@/components/Search";
import {useServerContext} from "@/app/provider";
import HeaderWithImage from "@/components/Headers/HeaderImage";
import {STATUS_PAGE} from "@/constants/global";
import {Card} from "@/components/card/Card";

export default function Header() {
  const {productsCart, pageStatus} = useServerContext()

  return (
    <>
      {(pageStatus.status === STATUS_PAGE.INIT) && productsCart.length ? (
        <div className="h-[140px] sm:h-[150px]">
          <div className="h-[140px] px-[20px] sm:h-[150px] flex flex-wrap gap-x-[50px] items-center fixed top-0 left-0 w-full z-40 bg-primary justify-center">
            <LogoImage customClass="h-[50px] lg:h-[70px]"/>
            <Search customClass="xl:py-4 xl:px-5 xl:text-lg"/>
          </div>
        </div>
      ) : (
        <HeaderWithImage>
          {
            (pageStatus.status === STATUS_PAGE.INIT)
              ? <Search customClass="sm:py-4 sm:px-5 sm:text-lg"/>
              : <Card {...pageStatus} />
          }

        </HeaderWithImage>
      )}
    </>
  )
}
