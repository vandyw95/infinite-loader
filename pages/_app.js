import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from 'global-styles';
import { DEFAULT_THEME } from 'styled-theme';

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <GlobalStyles />
        <ThemeProvider theme={DEFAULT_THEME}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
