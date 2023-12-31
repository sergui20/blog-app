/**
 * 16.1: Building our Contact form.
 * The goal now is that when we send our form, we send it to an API route, 
 * and then there, we store it in a database. We don't directly talk to a database 
 * in here as we learned, because if we would do so, if we would add code 
 * for talking to a database in the contact form component, then we would have 
 * to put our database credentials into this component as well. 
 * And we don't wanna do that for security reasons. Hence, we'll do it the other way 
 * and add our API route plus the code to talk to that API route.
 */
import { useState, useEffect } from 'react';

import classes from './contact-form.module.css';
import Notification from '../ui/notification';

async function sendContactData(contactDetails) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
}

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();


  // Check the "requestStatus" to clear our the notification after 3 seconds
  // if the request is a success or error.
  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  /**
   * 18.1: Sending data from client to our Contact API route.
   * We need to send the entered email, name, and message we've collected from this
   * form.
   * 
   * After wiring up the data we've collected from the form we only got two main 
   * steps left, two main tasks which we have to tackle. We probably 
   * wanna show some feedback to the user on the front-end like a notification 
   * when the request is on its way, when it succeeded, or when it failed.
   * And of course, we wanna store the data in the actual database. We'll do that
   * in next lectures.
   */
  async function sendMessageHandler(event) {
    event.preventDefault();

    /**
     * optional: Add client-side validation. You could add because client-side
     * validation helps you having full control on what error messages you want
     * to display, maybe even better than server-side.
     */

    setRequestStatus('pending');

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus('success');
      setEnteredMessage('');
      setEnteredEmail('');
      setEnteredName('');
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  }

  // So, depending on the status of a request we set up our notification.
  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            id='message'
            rows='5'
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {/* 20.2: Adding notification feedback when posting messages to the API.
      'pending', 'success', 'error' are the possible values the notification status
      can have.

      We could break this Contact form components into smaller components since it is
      getting bigger.
      */}
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
