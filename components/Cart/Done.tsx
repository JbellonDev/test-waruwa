import {CheckCircleIcon} from "@heroicons/react/24/outline";

interface Props {
  remissionNumber: string
}

export default function DoneRemission({remissionNumber}: Props) {
  return (
    <div className="w-max-[700px] mx-auto flex flex-col justify-center p-8 rounded-lg border border-neutral-200 md:p-10">
      <CheckCircleIcon className="text-success h-48" />
      <span className="text-center">Se ha creado tu pedido con Numero de Orden: <b>{remissionNumber}</b></span>
    </div>
  );
}
