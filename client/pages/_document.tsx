import Document, { Head, Html, Main, NextScript } from 'next/document';

import React from 'react';

const LANGUAGES = ['en'];

class MyDocument extends Document {
  render() {
    const pathPrefix = this.props.__NEXT_DATA__.page.split('/')[1];

    const lang =
      LANGUAGES.indexOf(pathPrefix) !== -1 ? pathPrefix : LANGUAGES[0];

    return (
      <Html lang={lang}>
        <Head>
          <title>Codegrep</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;