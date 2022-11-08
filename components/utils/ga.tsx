import Script from 'next/script';
import React from 'react';

const GoogleAnalytics = () => (
  <React.Fragment>
    <Script
      async
      src='https://www.googletagmanager.com/gtag/js?id=G-S13513W6JK'
      strategy='afterInteractive'
    />
    <Script strategy='afterInteractive' id='google-anayltics'>
      {`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-S13513W6JK');`}
    </Script>
  </React.Fragment>
);

export default GoogleAnalytics;
