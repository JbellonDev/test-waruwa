import './globals.css'
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const { SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='light'>
      <body className="flex flex-col bg-background text-foreground min-h-screen justify-between">
        <Header size="sm"/>
        <main className="flex flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
