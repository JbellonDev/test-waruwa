import clsx from 'clsx';
import Logo from '@/public/logo.jpg'
import Image from "next/image";


export default function Footer({size}: { size?: 'sm' | undefined }) {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <Image src={Logo} alt="Waruwa Logo"
             className={clsx('border dark:border-neutral-700', {
               'h-[100px] w-[130px] rounded-xl': !size,
               'h-[60px] w-[60px] rounded-lg': size === 'sm'
             })}
      />
    </footer>
  )
}
