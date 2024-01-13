'use client' // Error components must be Client Components

import ErrorUser from "@/components/ErrorUser";
import {urlToRedirect} from "@/constants/global";

export default function Error() {
  return (
    <ErrorUser msg="No pudimos ejecutar la acción, por favor contáctanos para solucionar el problema" url={urlToRedirect} />
  )
}