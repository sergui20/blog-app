/**
 * 5.2: Adding Styling and a Logo component.
 * We added a Logo by just using CSS and we will use it in the "main-navigation"
 * component.
 */
import classes from './logo.module.css';

function Logo() {
  return <div className={classes.logo}>Max' Next Blog</div>;
}

export default Logo;
