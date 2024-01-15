import clsx from 'clsx';
import Logo from '@/public/Logo Waruwa - Blanco.svg'
import Image from "next/image";

export default function LogoImage({customClass}: { customClass: string }) {
  return (
        <Image src={Logo} alt="Waruwa Logo" priority
               className={clsx(`z-10 w-auto ${customClass}`)}
        />
  )
}
