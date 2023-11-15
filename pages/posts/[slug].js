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

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
