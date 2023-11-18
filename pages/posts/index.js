/**
 * 1.3: Setting up the core pages.
 * Page to display all blog posts.
 * 
 * 9.1: Building the "All Posts" page.
 * So, in this page we want to fetch all posts from the database and display them.
 */
import Head from 'next/head';
import { Fragment } from 'react';

import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';

function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name='description'
          content='A list of all programming-related tutorials and posts!'
        />
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  );
}

/**
 * 13.2: Using Markdown data for rendering posts.
 * Let's do something very similar as what we did in the Homepage. Let's load all
 * our MD files into the "All Posts" page using "getStaticProps". We are fine
 * rebuilding and redeploying per every modification we do.
 */
export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;
