import './globals.css'
import { Inter,Nunito } from 'next/font/google'
// import Sidebar from "@/components/Sidebar"
import MainLayout from "./layout/MainLayout"
import Script from 'next/script'


const inter = Inter({ subsets: ['latin'] })
const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'INDEX RDC',
  description: 'Plateforme ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script strategy="lazyOnload" async src="https://www.googletagmanager.com/gtag/js?id=G-4YR7ZLLGW8"></Script> 
      <Script strategy="lazyOnload"> 
        {`
        window.dataLayer = window.dataLayer || []; 
        function gtag(){
          dataLayer.push(arguments)
        } 
        gtag('js', new Date()); 
        gtag('config', 'G-4YR7ZLLGW8',{page_path: window.location.pathname}) 
        `}
      </Script>
      <body className={inter.className}>
          <MainLayout className="dark" children={children} />
          {/* {children} */}
          {/* <svg viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="6" r="4" stroke="#1C274C" stroke-width="1.5"></circle> <path d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg> */}
        </body>
    </html>
  )
}
