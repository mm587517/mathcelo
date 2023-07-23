import { Html, Head, Main, NextScript } from 'next/document';
import Header from './components/Header';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />

      <body>
        <Header />
        <div className='my-8 mx-4 md:my-12 md:mx-8'>
          <NextScript />
          <Main />
        </div>
      </body>
    </Html>
  );
}
