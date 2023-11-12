/**
 * 4.1: Adding Layout and Navigation.
 * Let's add a general layout and a navigation bar, because it will not only 
 * be needed on the homepage.
 * We wrapped our entire app with the "Layout" component you can see below.
 * The way we split or built our layout is by creating a "layout" subfolder
 * under the "components" folder. And in there add the components we need for the layout
 * such as "logo" and "main-navigation".
 */
import Head from 'next/head';

import '../styles/globals.css';
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
