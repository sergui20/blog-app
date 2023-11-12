/**
 * 9.2: Building the "All Posts" page.
 * This is just a "<section>" where we reuse our "PostsGrid" component.
 */
import classes from './all-posts.module.css';
import PostsGrid from './posts-grid';

function AllPosts(props) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

export default AllPosts;
