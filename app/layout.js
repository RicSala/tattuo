import { UiProvider } from '@/providers/ui/UiProvider'
import './globals.css'
import { Inter } from 'next/font/google'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'
import ToasterContext from '@/providers/ToasterContext'
import { AuthProvider } from '@/providers/auth/AuthProvider'
import CustomSessionProvider from '@/providers/SessionProvider'
import RegisterArtistModal from '@/components/modals/RegisterArtistModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TATTUO · Los mejores tautadores en tu ciudad',
  description: 'Generated by create next app',
}


// TODO: onboarding tour: https://blog.openreplay.com/user-onboarding-tours-made-simple-with-react-joyride/
// https://reactour.vercel.app/tour
//REVIEW: is not redundant the authcontext and authprovider??

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UiProvider>
          <CustomSessionProvider>
            <AuthProvider>
              <ToasterContext />
              <RegisterModal />
              <RegisterArtistModal />
              <LoginModal />
              {children}
            </AuthProvider>
          </CustomSessionProvider>
        </UiProvider>
      </body>
    </html>
  )
}
