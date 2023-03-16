import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { GlobalStyle } from '../css/globals';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const font = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <>
      {
        router.pathname !== "/design/[id]/view"
          ? <>
            <style jsx global>{`
              html { font-family: ${font.style.fontFamily}; }
            `}</style>
            <GlobalStyle />
          </>
          : <style jsx global>{`
            @import url("https://necolas.github.io/normalize.css/8.0.1/normalize.css");
          `}</style>
      }
      <Component {...pageProps} />
    </>
  )
}
