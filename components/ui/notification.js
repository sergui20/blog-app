/**
 * 20.1: Adding notification feedback when posting messages to the API.
 * You could use Context API as we did in the previous project, but in this project
 * we don't need to trigger a notification from different parts of our app. We only
 * needs to show a notification in our Contact form.
 * 
 * 23.2: Using React portals.
 * We had to convert this Component so that it can be rendered as a portal or be
 * injected into the "<div id="notifications"></div>" element we added in "_document.js".
 * For that we need to import "ReactDOM" and on line 32 you can see it is decorated 
 * with the method "ReactDOM.createPortal".
 */
import ReactDOM from 'react-dom';

import classes from './notification.module.css';

function Notification(props) {
  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  /**
   * 23.3: Using React portals.
   * We need to decorate our elements here with the method "ReactDOM.createPortal".
   */
  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById('notifications') // In here we specified in which element we want to inject this portal.
  );
}

export default Notification;
