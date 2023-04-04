import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { GlobalStyle } from '../css/globals';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const font = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const styleSheet = document.styleSheets[0]
    if (styleSheet && styleSheet.ownerNode) (styleSheet.ownerNode as HTMLElement).id = "compyDesign"
  }, [])
  return (
    <>
      <style jsx global>{`
        html { font-family: ${font.style.fontFamily}; }
      `}</style>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}
