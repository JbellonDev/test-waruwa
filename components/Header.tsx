import clsx from 'clsx';
import Logo from '@/public/logo.jpg'
import Image from "next/image";

export default function Header({size}: { size?: 'sm' | undefined }) {
  return (
    <div className="flex flex-col gap-4 items-center pt-4">
      <div className="flex gap-8 justify-center items-center">
        <Image src={Logo} alt="Waruwa Logo"
               className={clsx({
                 'h-[100px] w-[130px] rounded-xl': !size,
                 'h-[60px] w-[60px] rounded-lg': size === 'sm'
               })}
        />
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-8"/>
    </div>
  )
}
