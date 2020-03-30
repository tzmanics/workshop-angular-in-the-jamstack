# Creating a Pre-rendered Home Page

One of the fundamental elements of creating a site with the Jamstack architecture is pre-rendering content. This allows for faster delivery of your content, fewer security vulnerabilities, and immutable content. Along with pre-rendering the page we're going to work on we'll also be storing out static assets in cloud-based image service, Cloudinary (also referred to as a Digital Asset Management). One less thing we have to manage or worry about. Yay!

## Cloud Content

There are many benefits to having your media stored somewhere that isn't your project! Git is made to manage code, media files? Not really their forte. Having a site that is dedicated to that is a great way of delegating tasks to skilled providers. We're using Cloudinary today but there are others too ([Bynder](https://www.bynder.com/en/), [Brandfolder](https://brandfolder.com/), [Netlify](https://www.netlify.com/blog/2019/02/26/manage-your-code-and-assets-together-with-netlify-large-media/)).

## Premeditative Pre-rendering

It just makes sense: if you can make your content into a tiny, static file, it's going to get to your users faster. The sites that we make with Angular haven't really been that. You can tout a lot of things about Angular, size isn't at the top of the list. The Angular community has been asking for a path to pre-rendering for quite some time now.

To be fair, there has been one. Angular Universal gave you the option to pre-render. So, there was that. With the Angular 9 release there has been updates to the pre-render process in Universal. It seems the Angular team is hearing and heeding the requests of developers. Nonetheless, people were still begging for someone to make a static site generator.

## The Angular SSG is Out There

Finally! Hero Devs to the rescue. At the end of last year the team at Hero Devs released the alpha version of Scully, Angular's first, designated static site generator (SSG). Not only does Scully make it ridiculously easy to pre-render any Angular (even Angular.js) site but it does via familiar Angular commands. We've been waiting for this for a while and the team keeps improving it everyday. They are super open to feedback, [so join the fun!](https://github.com/scullyio/scully)

This was a clear signal that the Angular community is invested in being a part of the Jamstack architecture and ecosystem. For so long Angular was left out of the Jamstack conversation and it could be because the Angular community didn't know what all the Jamstack could do. But it's clear that the tools to create a clear path of Angular integration haven't existed before. The creation of Scully was a huge step on this path and I can not wait to see what comes next.

_Immediately_ next, tho, is us coding some pre-rendered Angular together.

# Time to Code

In this exercise we're going to add a few images and some text. Basically, we want to populate the page and get comfortable with optimizing and adding content from the cloud. Then we'll use Scully to create a pre-rendered, static version of our site.

- prepare assets in Cloudinary
- fill home component with content
- ng add Scully
- get whiplash from our site speed

Code with me!

## Getting Setup

To get started you can either clone this whole workshop and start with the base project in this directory or you can clone the final version of the base project.

```bash
git clone https://github.com/tzmanics/workshop-angular-in-the-jamstack

...

git clone https://github.com/tzmanics/base-project_final
```

If you've been following along from the base project section, you can also simply build off of that project. This is a good jumpoff point for us because it's a site that navigation, routing, and the Netlify configurations.

With the cloned projects you'll want to run `npm i`, set the remotes to your own git repos, and push an initial commit. You can follow along with how to do that [here, in any earlier section](https://github.com/tzmanics/workshop-angular-in-the-jamstack/tree/master/_step-1_base-project#git-going).

## Adding Content

The first thing we'll do is fill the page with some content. There are many ways to optimize images and serve them up. Today we're going to squoosh & store. First, you can either feel free to use your own images or grab some from [Upsplash](https://unsplash.com/). For uniformity, I cropped all my images into squares. The number of pictures you choose to use is completely optional but four pictures will fit the project best.

### Squoosh & Save

Next, if you don't already have an account at Cloudinary, you can create a free one [here](https://cloudinary.com/users/register/free). You can also feel free to choose another service as well. Here is the process I use for optimizing and storing images.

1. download and crop locally
2. open up https://squoosh.app/editor and drag the picture in to the editor, resize to a reasonable size (images for this project are 300x300), then hit the download icon
3. i then open Cloudinary in another (or the same) tab and since the image is in the bottom shelf of the browser window i just drag it up into my Cloudinary media library.

![a gif of saving squooshed images to cloudinary](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1585563798/cloudinary_frfo96.gif)

Now you can either save those links in a document or you can keep you Cloudinary tab open for future reference.

### Component Content

Now we're going to start filling up our Home page template. First let's go ahead and serve up the project and keep it open in a browser window so we can watch the magic happen. Head over to [localhost:4200](http://localhost:4200/) and you should see a site that has a nav bar with a few links. The background picture is taken at Flims, Switzerland. A beautiful place I was fortunate enough to visit thanks to Front Conf. I highly recommend it!

```bash
ng serve --open
```

Inside of `src/app/home/home.component.html` we'll add a few divs and some text to start.

```html
<div class="app-home">
  <h1 class="motto">The Fastest Angular on the Web</h1>
  <div class="home-words">
    <p>
      Fast and secure sites and apps delivered by pre-rendering files and
      serving them directly from a CDN, removing the requirement to manage or
      run web servers.
    </p>
  </div>
</div>
```

Next, we'll start adding cards to hold and order the content that's going in. After the top content we'll make a div for the cards called `home-box` (I know, such creative). Inside of thar div will live the div for each card under class `home-card`.

```html
...

<div class="home-box">
  <div class="home-card">
    <h1 class="home-card-header">Fast</h1>
    <img
      class="home-card-image"
      src="https://res.cloudinary.com/dzkoxrsdj/image/upload/v1585107167/cara-fuller-34OTzkN-nuc-unsplash_1_anhvwp.jpg"
      alt="running cheetah"
    />
    <p class="home-card-content">
      <b>Faster websites.</b>
      Optimize your site with prerendering and global delivery.
    </p>
  </div>
</div>
```

As you can see, each card has a

- `h1` header, `home-card-header`
- `img` that uses the Cloudinary link as its `src`
- and a short blurb, class `home-card-content`

This card is repeated four times more with different content. You can see [the full file here](https://github.com/tzmanics/prerendered-home-page/blob/master/src/app/home/home.component.html).

> 🐙 tip: I like to commit and commit often. After adding all the content to the template, it would be a great time to add and commit your code.

### Serving Styles on Styles

Now to make sure things line up we're going to flex on this file 💪. There's a lot going on in the file so I'll walk through each block then link the fill file at the end.

In `src/app/home.component.scss`, we'll start with styling the little blurb under the header, a.k.a. `.home-words`. For better legibility we'll make the background a transparent white and bump up the font size to 25px. We use a margin at `0 auto` to center, then add padding to pull the text away from the edges of the box. Finally, we'll center `p` and remove its margins.

```css
.home-words {
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 25px;
  margin: 0 auto;
  padding: 10px 10%;
  p {
    margin: 0;
    text-align: center;
  }
}
```

Next up, `.home-box`. Flex, flex is a wonderful css value to help us line things up and make it responsive. We set `display` to `flex`, set `flex-wrap` to `wrap`, and use `justify-content: space between` to make the cards flow well. Everything else in here is pretty self-explanatory.

```css
.home-box {
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 150px auto;
  padding: 0;
  width: 90%;
  p {
    margin-top: 20px;
  }
}
```

The last two settings are just to space out the cards, set the header text and make the images fit in the cards well.

```css
.home-card {
  max-width: 285px;
  margin: 0 auto;
  h1 {
    font-size: 25px;
    text-align: left;
  }
}

img {
  margin: 0 !important;
  width: 100%;
}
```

Finally, we have a section to set the widths, margins, and font-sizes for mobile devices or display widths no larger than 480px.

```css
@media (max-device-width: 480px) {
  .app-home {
    min-width: 0;
    h1 {
      font-size: 40px;
    }
  }

  .home-box {
    margin: 0 auto;
    width: 95%;
  }

  .home-words {
    font-size: 20px;
    padding: 0;
  }

  .home-card {
    font-size: 20px;
    width: 100%;
    h1 {
      font-size: 25px;
    }
  }
}
```

That's it for styling! You can see the whole file [here](https://github.com/tzmanics/prerendered-home-page/blob/master/src/app/home/home.component.scss). If you take a look at what we have being server on [localhost:4200](http://localhost:4200/) you should have a responsive layout of cards with titles, images, and blurbs.

![screenshot of app home page](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1585572281/Screen_Shot_2020-03-30_at_8.43.37_AM_bfv4nq.jpg)

Want to see it live? Just commit and push your code to your repository. This will trigger a Netlify build and you can run Netlify's open command to see the build in your project dashboard.

```bash
git add .
git commit -m 'adds amazing content'
git push

netlify open
```

## Introducing Scully

Now that we have all the content where we want it and how we want it on our home page let's pre-render it! We'll add Scully to our project run the process for finding and pre-rendering all the pages. Then, we'll need to change our build command to make sure we deploy the new static content.

### Adding Scully

We can use the `ng add` command to integrate Scully into our project.

```bash
ng add @scullyio/init
```

As you can see from the output, the Scully schematics updated a few files (`app.module.ts`, `polyfills.ts`, and `package.json`) and created a `scully.base-project.config.js` file. Since this project is a clone of the [our base project](https://github.com/tzmanics/base-project_final) it has taken the name information from the `angular.json` file to set this file name.

![screenshot of scully output](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1585573122/Screen_Shot_2020-03-30_at_8.55.47_AM_gckiup.jpg)

We want to make sure we run the build command `ng build (or ng build --prod)` before we run Scully with `npm run scully`. Scully traverses the project to get information on the routes and pre-render the content, so we build it to have the most up-to-date version ready for it. Instead of having to these commands each time we can make two scripts, `jam` and `jam-prod` in the `package.json` file.

```json
{
  "name": "base-project",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "scully": "scully",
    "scully:serve": "scully serve",
    "jam": "ng build && npm run scully",
    "jam-prod": "ng build --prod && npm run scully -- --nw"
  },
  ...
```

To make local checks easier the `jam` script can be run with `npm run jam`. That will build out the project, run Scully, and also open up a local server to check the output at [localhost:1668](http://localhost:1668/). We can see the stats from running Scully including how many routes it created and how long it took.

![screenshot of output from running scully](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1585573969/Screen_Shot_2020-03-30_at_9.07.11_AM_byihrb.jpg)

The script we made for the production build is a little different. First off we pass the `--prod` flag to `ng build` to set the build configuration to production target. Then we pass two different flags to Scully. The first `--` is there to let npm know you're are about to pass parameters and the second `--nw` is to turn Scully's `watch` feature off. This is the feature that is turned on by default and starts up the local server. We don't want that in our production build on Netlify because it will make it so the build never completes.

### Reconfiguration

We have a new build command but we also have a new directory where Scully builds out the static version of our site, `dist/static`. In order to tell Netlify to build out the site with Scully _and_ to serve the newly made pre-rendered content we need to change out `netlify.toml` configuration file.

```toml
[build]
  publish = "dist/static"
  command = "npm run jam-prod"
[[redirects]]
  from="/*"
  to="/index.html"
  status=200
```

We can simplify the command by just passing that nifty production script we made, `npm run jam-prod`. If you've continued this project on from the base project you will still be hooked into your Netlify project. So, if you commit your code and push it up to GitHub, it will trigger a Netlify build using this new build information. If you run the command `netlify open` in your terminal you can check out the new build in your Netlify dashboard.

So, if it all worked correctly, you should be able to go to your site at `<project-name>.netlify.com` and see that absolutely nothing has changed. That means we didn't break anything, woo hoo! You can even go into the developer tools,a [disable JavaScipt](https://developers.google.com/web/tools/chrome-devtools/javascript/disable), and see that since you're serving the pre-rendered content everything still works.

> If you started from a newly cloned or created project, you'll need to connect your project with `netlify init`. You can find the full directions [here in this repo](https://github.com/tzmanics/workshop-angular-in-the-jamstack/tree/master/_step-1_base-project#a-b-cdn).

## Would Ya Look At That

We have a totally pre-rendered static site. You can see the complete finished product in [this section's folder](https://github.com/tzmanics/workshop-angular-in-the-jamstack/tree/master/prerendered-home-page/prerendered-home-page). We were able to compress our image assets and deliver them using a cloud-base image service. Then we used, Scully, the Angular SSG, to pre-render our whole site. Go us!

## Resources for the Road

Check out these resources to learn more!

- [Scully's Website](http://scullyio.com/)
- [Building an Angular Jamstack Site
  with
  Scully](https://www.netlify.com/blog/2019/12/17/building-an-angular-jamstack-app-with-scully/)
- [Update on Scully: Angular's Static Site
  Generator](https://www.netlify.com/blog/2020/02/24/update-on-scully-angulars-static-site-generator/)
