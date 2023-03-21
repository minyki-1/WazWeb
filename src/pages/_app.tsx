import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { GlobalStyle } from '../css/globals';
import { useRouter } from 'next/router';

const font = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  return (
    <>
      {
        pathname !== "/design/[id]/view"
          ? <>
            <style jsx global>{`
              html { font-family: ${font.style.fontFamily}; }
            `}</style>
            <GlobalStyle />
          </> : null
      }
      <Component {...pageProps} />
    </>
  )
}
