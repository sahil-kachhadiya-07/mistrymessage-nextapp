import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { AuthProvider } from './context'
import { ToastContainer } from 'react-toastify'
import { NavBar } from './components/Navbar'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NavBar />
          {children}
          <ToastContainer
            position='top-left'
            newestOnTop
            rtl={false}
            pauseOnFocusLoss
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            draggable
            pauseOnHover
          />
        </body>
      </AuthProvider>
    </html>
  )
}
