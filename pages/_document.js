/**
 * 22.1: Adding the "_document.js" file.
 * As you might remember this file allows us to define the general structure 
 * of our page. And for example, set an attribute on the HTML element itself
 * or add extra entry points, extra elements which we could use with react portal.
 * 
 * We plan to use a React portal in next lectures so that is why we also add this file.
 * 
 * Remember that the Head component in here is different from the Head component 
 * we used in "_app.js" and the other pages. This head component here should only be used
 * for setting up this "_document.js" file.
 * 
 * And therefore adding this extra metadata and adding this "_document.js" file 
 * is something you typically also wanna do to make sure that you do prepare your page
 * not just visually for your visitors, but that you also set the correct metadata.
 */
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    // If you reload the page and inspect the source code, you will see that the
    // "lang" attribute is added at the initial load.
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="notifications"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
