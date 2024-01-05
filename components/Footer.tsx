import LogoImage from "@/components/LogoImage";


export default function Footer({size}: { size?: 'sm' | undefined }) {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <LogoImage size={size} />
    </footer>
  )
}
