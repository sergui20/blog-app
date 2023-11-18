/**
 * 1.4: Setting up the core pages.
 * Individual blog post page. This is a Dynamic Page. And we could have just create
 * the page with a Dynamic value "[id].js", but it's not very human readable 
 * and also not search engine friendly. It is better to have URLs like 
 * "/posts/getting-started-with-nextjs". If our URL looks like that, 
 * we better should call it a slug. That's what we typically call a slug. 
 * It's also a unique identifier, we could call it a unique ID, but it is called a slug 
 * and it's basically a human readable sentence without white space, 
 * without special characters. Simply with words separated by dashes.
 */
import Head from 'next/head';
import { Fragment } from 'react';

import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '../../lib/posts-util';

function PostDetailPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name='description' content={props.post.excerpt} />
      </Head>
      {/* 10.3: Adding the "Post Detail" page.*/}
      <PostContent post={props.post} />
    </Fragment>
  );
}

/**
 * 14.1: Rendering Dynamic Post pages and paths.
 * Let's do something very similar as what we did in the previous lecture for 
 * pre-generating our Homepage and All Posts page. We want to pre-generate now for
 * our Post Detail page.
 */
export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    // Here, we are making a case for applying 'revalidate'. We want to re-generate the page details every 10 mins.
    // and also this won't take up much time since we are just re-generating for a single post. It won't affect our website.
    revalidate: 600,
  };
}

/**
 * 14.2: Rendering Dynamic Post pages and paths.
 * "getStaticProps" in a Dynamic page can't work on its own, it needs the "getStaticPaths"
 * to let Next.js know which concrete slug values it should pre-generate.
 * This returns an object with all the paths that should pre-generate.
 * 
 * Now we can not prepare anything, and basically just set "paths: []" 
 * and set fallback to true. Then the data will be prepared and fetched on the mount,
 * when we visit this page. With fallback true, we should also render some, 
 * fallback content though, for this scenario that the post hasn't been loaded yet.
 * Or we can set fallback to blocking, to wait until it has been generated.
 * This could be fine if you have a blog with, thousands of posts, 
 * where a lot of those posts are, rarely read and rarely visited, 
 * and you don't wanna pre-generate all those posts. Then, using a pattern like 
 * this could make sense. 
 * 
 * Or you pre-generate some of your posts, your most popular posts, 
 * and not all of them. In this blog here, where we will only have a couple of posts,
 * only a couple of dozens, or hundreds of posts, pre-rendering all posts, 
 * isn't too difficult and isn't too much work. 
 * 
 * And hence I'll set fallback to false, and explicitly define all paths in advance.
 * And for defining all paths in advance, we need to know, which paths we have.
 * 
 * So, let's get all our post file names and get the slug and return that list to
 * the "getStaticProps" function.
 */
export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })), // Notice you need to specify "params" object.
    fallback: false,
  };
}

export default PostDetailPage;
