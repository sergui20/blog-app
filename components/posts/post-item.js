/**
 * 7.1: Adding the Post Item component.
 * In here, we want to render just an individual post and this component
 * will be rendered from outisde for each post comming fron the server.
 * 
 * We formatted the date to make sure we display in a more friendly way to the users.
 * The image we set with width 300 and 200 will produce good looking image even for higher
 * screens. So, it wasn't necessary to set more width and height.
 */
import Link from 'next/link';
import Image from 'next/image';

import classes from './post-item.module.css';

function PostItem(props) {
  const { title, image, excerpt, date, slug } = props.post;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <a>
          <div className={classes.image}>
            <Image
              src={imagePath}
              alt={title}
              width={300}
              height={200}
              layout='responsive'
            />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default PostItem;
