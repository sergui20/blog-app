/**
 * 12.1 Utility functions to fetch and read Markdown files.
 * This simply is a file which have extra utility functionality for fetching 
 * post data and for extracting metadata from those markdown files.
 * 
 * For this we need to install another extra package, "gray-matter" package. This is 
 * a package which allows us to read a markdown file and split it into 
 * metadata and the actual markdown content.
 */
import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts'); // 'process.cwd()' returns our root directory, not this lib directory.

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

/**
 * In here we want to read the content and metadata of a Markdown. We are using
 * "matter" to split up the content and metadata.
 * This works by either passing an identifier with the ".md" extension or not.
 */
export function getPostData(postIdentifier) {
  /**
   * Removes the file extension.
   * Make sure your Markdown files under the "posts" directory have this slug format.
   */
  const postSlug = postIdentifier.replace(/\.md$/, '');
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent); // 'data' is the medatata and 'content' is the markdown as a string. This is the schema returned by 'matter'.

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

/**
 * It goes through all our Markdown files to get the metadata for all of them.
 * So, we want to go through all those post files and dive into them 
 * to extract metadata and markdown content. I also want to figure out the "slug"
 * which can be put in the URL from the file name. So, basically we want to 
 * use the file name, without the extension.
 * @returns 
 */
export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map(postFile => {
    return getPostData(postFile); // This function reads, parses and returns the Markdown metadata and the content.
  });

  // Sort by date.
  const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);

  return sortedPosts;
}

/**
 * This function resuses the function to get all posts and then filter them by using
 * the "isFeatured" metadata. If it is true, then we keep it.
 * 
 * If you don't read through all the Markdown files, you could keep 
 * an extra data source around, something like a JSON file which holds 
 * the slugs of all the "featuredPosts". And then you would just read those 
 * and then just pull the specific markdown files which this extra json file points at.
 * That could be an alternative for a bigger blog with hundreds or thousands 
 * of posts to increase the build performance a little bit, 
 * but for this blog, this approach is absolutely fine.
 * @returns 
 */
export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter(post => post.isFeatured);

  return featuredPosts;
}