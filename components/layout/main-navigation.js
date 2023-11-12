/**
 * 4.2: Adding Layout and Navigation.
 * For the links we will not use the standard "<a>" tag, because that would 
 * be handled by the browser only, and when we click it, we would load a brand-new page 
 * and send a brand-new request. Instead, we want to use Next's Link component 
 * to take advantage of automatic data prefetching which it does for us, 
 * and to take advantage of the fact that we stay in a single-page application 
 * once the page was loaded initially.
 */
import Link from 'next/link';

import Logo from './logo';
import classes from './main-navigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      {/* 4.4: Adding Layout and Navigation.  
        You might remember that when you pass a component as children, Link will not
        render the "<a>" tag, so we need to explicitly define it. This is no londer needed
        for the latest version of Next.js though.
      */}
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        {/* 4.3: Adding Layout and Navigation. 
          The Links you see below matches the structure of the routes of this page.
        */}
        <ul>
          <li>
            <Link href='/posts'>Posts</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
