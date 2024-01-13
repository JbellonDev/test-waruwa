'use client'
import {useRouter} from "next/navigation";

export default function ErrorUser({msg, url}: {msg: string, url: string}) {
  const { push } = useRouter();

  return (
    <div>
      <div
        className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12">
        <h2 className="text-xl font-bold">Oh no!</h2>
        <p className="my-2">
          {msg}
        </p>
        <button
          className="mx-auto mt-4 flex w-full items-center justify-center rounded-full bg-primary p-4 tracking-wide text-white hover:opacity-90"
          onClick={() => push(url)}
        >
          Contáctanos
        </button>
      </div>
    </div>
  )
}
