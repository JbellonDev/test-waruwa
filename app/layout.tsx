import './globals.css'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Providers} from "@/app/provider";
import { Inter } from 'next/font/google'
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] })
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
    <html lang="en" className={`${inter.className} light`}>
      <body className="bg-background text-foreground min-h-screen">
      <Providers>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </Providers>
      </body>
    </html>
  )
}
