'use client'

import clsx from "clsx";
import {useRouter} from "next/navigation";

interface Props {
  urlToGo: string,
  name: string,
  imageUrl: string,
  className: string
}

export default function SocialIcons({urlToGo, name, imageUrl, className}: Props) {
  const { push } = useRouter();

  return (
    <div className={clsx(`flex w-[28px] justify-center h-[28px] p-[6px] border border-[#0000001A] rounded-[35px] ${className}`)}>
      <img src={imageUrl} alt={name} onClick={() => push(urlToGo)} className={clsx(`w-full ${className}`)} />
    </div>

  )
}
