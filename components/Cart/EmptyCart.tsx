import workers from "@/public/workers.svg"
import Image from "next/image";
import shopping from "@/public/shoppingCart.svg"


export default function EmptyCart() {

  return (
    <div className="mt-16 flex flex-wrap w-full h-full items-center justify-center gap-x-[60px] gap-y-[70px]">
      <div className="flex flex-col items-center gap-[34px]">
        <Image src={shopping} alt="Carrito" />
        <p className="flex flex-col items-center gap-[20px] sm:gap-[10px]">
          <span className="text-[#666] text-center text-[14px] sm:text-[22px]">Aun no has agregado nada a tu pedido</span>
          <b className="bg-primary text-white text-[14px] sm:text-[24px] font-extrabold leading-normal px-[12px] py-[6px] sm:px-[20px] sm:py-[10px]">Estamos listos para atender tu orden</b>
        </p>
      </div>
      <Image src={workers} alt="Trabajadores" width="529" />
    </div>
  );
}
