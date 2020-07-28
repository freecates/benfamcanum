import App from 'next/app';

function MyApp({ Component, pageProps, pathname }) {
  return <Component {...pageProps} ruta={pathname} />;
}

MyApp.getInitialProps = async appContext => {
  const pathname = appContext.ctx.pathname;
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, pathname };
};

export default MyApp;
