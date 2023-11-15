/**
 * 10.2: Adding the "Post Detail" page.
 * This is our Header component for our posts. They have a h1 title with an image.
 */
import Image from 'next/image';

import classes from './post-header.module.css';

function PostHeader(props) {
  const { title, image } = props;

  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={200} height={150} />
    </header>
  );
}

export default PostHeader;
