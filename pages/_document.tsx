import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';

import i18nextConfig from '../next-i18next.config';

type Props = DocumentProps & {
  // add custom document props
};

export default function Document(props: Props) {
  const currentLocale =
    props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
  return (
    <Html lang={currentLocale}>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Chatbot UI"></meta>
      </Head>
      <body>
        <div dangerouslySetInnerHTML={{
          __html: `
            <script>
              const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
                .then(FingerprintJS => FingerprintJS.load())

              fpPromise
                .then(fp => fp.get())
                .then(result => document.cookie = 'gpt_visitorId=' + result.visitorId)
            </script>
          `
        }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
