/**
 * 6.2: Starting to work on the "Featured Posts" part.
 * This is simply a CSS Grid with a fixed width for each colum and we are rendering
 * a PostItem component.
 * 
 * 8.1: Rendering Dummy Post Data.
 * So, let's wire up our Post Item component to here. With the posts array we receive 
 * let's render a PostItem component.
 */
import PostItem from './post-item';
import classes from './posts-grid.module.css';

function PostsGrid(props) {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
