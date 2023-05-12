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
            const isWechat = () => {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf("micromessenger") !== -1) {
                    return true;
                } else {
                    return false;
                }
            }
            if (isWechat()) alert('检测到您在微信中，可能会有显示问题，请使用浏览器打开该页面，获得更好的使用体验！');
          </script>
        ` }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
