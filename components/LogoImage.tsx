import clsx from 'clsx';
import Logo from '@/public/logo.jpg'
import Image from "next/image";

export default function LogoImage({size}: { size?: 'sm' | undefined }) {
  return (
        <Image src={Logo} alt="Waruwa Logo" priority
               className={clsx({
                 'h-[100px] w-[130px] rounded-xl': !size,
                 'h-[36px] w-auto rounded-lg': size === 'sm'
               })}
        />
  )
}
