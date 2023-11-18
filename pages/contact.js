/**
 * 1.2: Setting up the core pages.
 * Contact form page which users can fill out. We could add this page inside a folder,
 * but we are pretty sure the contact page won't have more route segments.
 */
import { Fragment } from 'react';
import Head from 'next/head';

import ContactForm from '../components/contact/contact-form';

function ContactPage() {
  return (
    <Fragment>
      {/* 21.3: Adding "Head" medatata.
        Same thing for our contact page.
      */}
      <Head>
        <title>Contact Me</title>
        <meta name='description' content='Send me your messages!' />
      </Head>
      <ContactForm />
    </Fragment>
  );
}

export default ContactPage;
