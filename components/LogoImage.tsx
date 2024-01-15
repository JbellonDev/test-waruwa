import clsx from 'clsx';
import Logo from '@/public/Logo Waruwa - Blanco.svg'
import Image from "next/image";

export default function LogoImage({size}: { size?: 'sm' | undefined }) {
  return (
        <Image src={Logo} alt="Waruwa Logo" priority
               className={clsx('z-10', {
                 'h-[80px] w-auto': !size,
                 'h-[40px] w-auto': size === 'sm'
               })}
        />
  )
}
