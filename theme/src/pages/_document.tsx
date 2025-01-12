
import { Html, Head, Main, NextScript } from "next/document";
import { PersistGate } from 'redux-persist/integration/react';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
