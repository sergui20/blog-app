/**
 * 3.1: Adding the Hero component.
 * So, we wanna build this hero component. This is a welcome component 
 * on the starting page where we present ourselves and therefore.
 * 
 * For the image, let's use the next Image component. So, we will get this 
 * automatically optimized image which is automatically reduced in size 
 * and where different images are then loaded for different devices possibly. 
 * And which is also lazy loaded.
 * Remember that for the "width" and "height" you need to calculate it based on
 * the closes size it will be rendered in the browser. Don't do it in CSS since you
 * will still load a big image with no reason but you will just be shrinking the size.
 * And you don't want just that.
 * You can also specify a "layout" attribute so that you can optimize up and down the image
 * based on the viewport size.
 * 
 * See the "2.1" where we rendered our Hero in there.
 */
import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/max.png' // You don't need to specify "public" folder.
          alt='An image showing Max'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Max</h1>
      <p>
        I blog about web development - especially frontend frameworks like
        Angular or React.
      </p>
    </section>
  );
}

export default Hero;
