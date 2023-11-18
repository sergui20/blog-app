/**
 * 10.1: Adding the "Post Detail" page.
 * So in here we want to output the content of a selected post. That includes 
 * a header with the title and maybe the image. Now later, we will actually 
 * get the post content as "Markdown". You'll see it in a couple of minutes 
 * and we'll then translate that Markdown to React JSX elements.
 * And we use Markdown here because it's less code than if we would use HTML 
 * and it can be translated into HTML or into JSX easily with third-party packages, 
 * which we'll add later.
 * 
 * This is how we will receive a post in the props:
 *  post = {
      slug: 'getting-started-with-nextjs',
      title: 'Getting Started with NextJS',
      image: 'getting-started-nextjs.png',
      date: '2022-02-10',
      content: '# This is a first post' <- So, the goal is to translate this string from Markdown into JSX which we'll do in the next lecture.
    }
 */

/**
 * 11.1: Rendering Markdown as JSX.
 * Let's install this npm package which takes Markdown and outputs JSX.
 */
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import PostHeader from './post-header';
import classes from './post-content.module.css';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

/**
 * 12.1: 
 * To be precise, let's see how we could add images or code snippets to this content 
 * because since we're building a blog and we are developers, we might be blogging about development topics
 * and that means that we also might wanna share code snippets as part of our posts.
 * 
 * If we just leave 'react-markdown' render images on its own we won't taking advantage 
 * of Next.js image optimizations. You will see that a regular <image> element, will be rendered. And that is "okay",
 * but we give up on all the optimization potential. For example, this is a huge image file, it's huge
 * and even if we change the size in CSS, we still load the original file. And that's definitely not what we want.
 * Lazy loading would also be nice to have, to optimize our website.
 */
function PostContent(props) {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  /**
   * We had to override how "react-markdown" treats Markdown content like images.
   * To override how certain elements are rendered, we can pass "react-markdown" an image key and define how
   * we should render.
   * 
   * The problem with the "image" renderer is that we will get several warnings since we are rendering images inside
   * <p> tags, because everything we read from Markdown using the "react-markdown" library is retrieved as a content.
   * 
   * So, let's customize how all paragraphs or contents should be rendered instead. We basically want to just override
   * the default if the content is an "image" and leave the default renderer to the rest of the contents.
   */
  const customRenderers = {
    // image(image) {
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    paragraph(paragraph) {
      const { node } = paragraph;

      if (node.children[0].type === 'image') { // Only customize the renderer for images.
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.url}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>; // So, notice that for the rest of the content we still want to render them as <p> tags.
    },

    code(code) {
      const { language, value } = code;
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          children={value}
        />
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      {/* 11.2: Rendering Markdown as JSX. */}
      <ReactMarkdown renderers={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
