import checkIcon from '@/public/checkIcon.png';
import Image from 'next/image';

interface CardProps {
    remissionNumber: string;
    icon?: string;
    title?: string;
    description?: string;
    button?: string;
    }
   
export const Card = ({remissionNumber}: CardProps) => {
    
    return ( 
        <div className="z-10 w-112 h-68 rounded-xl bg-white flex flex-col max-w-112 max-h-68 py-12 px-20">
           <Image src={checkIcon} alt="Check Icon" className="w-55 h-55 mx-auto" />
           <div className="text-neutral-700 text-base font-normal font-['Inter'] mx-auto mt-9">Se ha creado tu pedido con Número de orden</div>
           <div className="mt-9 mx-auto w-[119px] h-[38px] px-7 py-2.5 rounded-[46px] border border-black border-opacity-20 justify-center items-center gap-2.5 inline-flex">
           <div className="text-neutral-700 text-[25px] font-medium font-['Inter']">{remissionNumber}</div>
           </div>
        </div>
    )
}
