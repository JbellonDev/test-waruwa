import LogoImage from "@/components/LogoImage";
import Search from "@/components/Search";

export default function Header({size}: { size?: 'sm' | undefined }) {
  return (
    <div style={{ height: 94 }}>
      <div className="flex flex-col gap-4 items-center fixed top-0 left-0 w-full z-40 bg-white">
        <div className="flex w-full gap-8 justify-around items-center pt-4">
          <LogoImage size={size}/>
          <Search />
          <div></div>
        </div>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent"/>
      </div>
    </div>
  )
}
