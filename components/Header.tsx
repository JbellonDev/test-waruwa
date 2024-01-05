import LogoImage from "@/components/LogoImage";

export default function Header({size}: { size?: 'sm' | undefined }) {
  return (
    <div className="flex flex-col gap-4 items-center pt-4">
      <div className="flex gap-8 justify-center items-center">
        <LogoImage size={size} />
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-8"/>
    </div>
  )
}
