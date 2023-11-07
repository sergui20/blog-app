/**
 * 1.1: Setting up the core pages.
 * This is the starting page which shows the featured blog posts and a little
 * welcome message.
 */
import { Fragment } from 'react';
import Head from 'next/head';

import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { getFeaturedPosts } from '../lib/posts-util';

function HomePage(props) {
  /**
   * 2.3: Getting started with the Homepage.
   * The page component should be relatively lean and not put too much markup in here.
   * Also you shouldn't add a styling file. That is something you don't have to do 
   * but something you will often see that page components are relatively lean focus 
   * on getting data with "getStaticProps" if they need to, something we will add later,
   * and don't do too much regarding styling or HTML. Instead we use separate 
   * React components for that, and we then just use those separate React components 
   * here.
   */
  return (
    <Fragment>
      <Head>
        <title>Max' Blog</title>
        <meta
          name='description'
          content='I post about programming and web development.'
        />
      </Head>
      {/* 2.1: Getting started with the Homepage.
        A hero section is the section where we present our main product or 
        in the case of a blog, maybe ourselves. So that's this hero section 
        where we present ourselves. 
      */}
      <Hero />
      {/* 2.2: Getting started with the Homepage. 
        In this section we are going to present our most featured posts.
      */}
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;
