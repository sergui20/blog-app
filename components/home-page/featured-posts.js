/**
 * 6.1: Starting to work on the "Featured Posts" part.
 * The way they will be prresented will always be within a grid.
 * 
 * 8.2: Rendering Dummy Post Data. 
 * As you can see, we also receive "posts" in the props,
 * and you may think we could use Redux or Context to avoid the props-drilling. But we
 * don't really want to tie PostGrid to a specific context because we want to reuse it
 * for different array of posts.
 */
import PostsGrid from '../posts/posts-grid';
import classes from './featured-posts.module.css';

function FeaturedPosts(props) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

export default FeaturedPosts;
