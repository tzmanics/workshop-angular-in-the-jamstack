---
title: "What's Angular in the JAMstack? It Sounds Delicious!"
description: A guide to the JAMstack through an Angular lens.
authors:
  - Tara Z. Manicsic
date: "2019-10-30"
topics:
  - tutorials
tags:
  - Angular
  - JAMstack
tweet: ""
format: blog
canonical_url: https://www.netlify.com/blog/2019/10/30/whats-angular-in-the-jamstack-it-sounds-delicious/
publish: true
---

# What's Angular in the JAMstack? It Sounds Delicious!

You may have heard about the [JAMstack](http://jamstack.org), it's been growing in popularity since [its conception](https://www.netlify.com/blog/2016/09/15/the-jamstack-origin-story/?utm_source=blog&utm_medium=jamstack-angular-intro_tzm&utm_campaign=devex). There are a ton of great articles, videos, and tutorials that explain the JAMstack. I wanted this post to specifically delve into the topic through Angular-colored glasses (which are, of course, rose-colored 🌹).

## The JAMstack Explained

The JAMstack is a modern architecture using the technologies that we are used to, and, dare I say, fond of:

- JavaScript (<– insert Angular here)
- APIs
- Markup (<– we can also use Angular here!)

In the JAMstack we orchestrate these technologies to deliver safe, fast, and dynamic sites without relying on web servers.

> This is a great way to describe this acronym, but you don't _have_ to use _all_ of these technologies. The term JAMstack came into existence to help us talk about this architecture that let us remove the complexity of dealing with servers, give us the performance benefits of static sites, but make them dynamic.

In working with the [JAMstack best practices](https://jamstack.org/best-practices/?utm_source=blog&utm_medium=netlify-origin-tzm&utm_campaign=devex) you would:

- 🗄 deliver your site using globally-distributed CDN ([Content Delivery Networks](https://www.netlify.com/blog/2016/04/15/make-your-site-faster-with-netlifys-intelligent-cdn/?utm_source=blog&utm_medium=jamstack-angular-tzm&utm_campaign=devex)) nodes with content dynamically delivered via an API, such as via a CMS ([Content Management Services](https://www.netlifycms.org/docs/intro/?utm_source=blog&utm_medium=jamstack-angular-tzm&utm_campaign=devex))

- 🤝 use APIs, serverless functions and webhooks to make your site dynamic, and

- 🧰 establish a git workflow for a continuous, immutable, and atomic deployment process

Ok, great, but what can you say at the next team meeting? Here are a few high-level benefits this stack gives you:

⛓ Uncouple your frontend from your backend. Tightly-coupled, complicated architectures are harder to scale and harder to maintain or upgrade. By outsourcing your backend you're also outsourcing your most vulnerable entry points, servers and databases, to teams who can focus on the ever-changing hacking tactics. You don't _have_ to outsource to gain the benefits of decoupling, you can decouple inside your organization to let teams dedicate their focus to frontend _or_ backend.

👩🏾‍💻 Give your dev team more time and power. Instead of trying to learn and keep up with every technology front & back, your devs can focus on coding the frontend features and experiences your users are asking for. The Git workflow makes jumping into and contributing to a project faster, easier, and less risky (thanks to easy rollbacks). This allows for more freedom to innovate and a lower barrier of entry to contribute.

💰 Step Three: profit. Well, maybe, but more importantly, save money. From big ticket items like infrastructure, security, and backend teams/dev hours to smaller but costly items like license fees, the JAMstack helps alleviate your project budget.

😍 Give your users a better experience. Serving static content from globally-distributed CDNs with re-direct logic will allow you to reliably serve information to your users fast.

## We're Jammin'

I want to do a recap of the JAMstack parts and show you where Angular plays a role. When I saw how these pieces fit together, I definitely had an 'Ooh! That's my Jam!' moment.

### J is for JavaScript

The JavaScript in a JAMstack covers the dynamic parts of your app during the request/response cycle, running entirely on the client-side. In our case, we'll be using Angular as our JavaScript framework but any other framework, library, or plain ol' lovely JavaScript would work as well. Even if we were to spin up a new Angular application, using `ng new`, and deploy it using a CDN, we would have ourselves a JAMstack app because we wouldn't be relying on web servers.

### A is for APIs

This is where you feel the JAMstack become truly dynamic. Using API services, third-party libraries or custom serverless functions (lambda functions, [Netlify Functions](https://www.netlify.com/products/functions/?utm_source=blog&utm_medium=jamstack-angular-tzm&utm_campaign=devex), etc.) you can handle all your server-side and database procedures. To add forms you can drop in Google forms, to add search you can use [Algolia](https://www.algolia.com/), and to work with purchasing you can use the [Stripe API](https://stripe.com/docs/api). These are just a few examples of the growing ecosystem around JAMstack services.

> "Wait, we said no servers! What the what?" was my first thought. What cleared this up for me was realizing we use CDNs _not_ web servers to deliver our apps but tools using servers, like APIs and serverless functions to make our apps dynamic. The term "serverless" is very misleading and does not mean you are no longer using servers. I have a blog post discussing these terms and how servers are and _are not_ used in the JAMstack development process (will link when available 👍).

### M is for Markup

Templated, pre-rendered markup makes content delivery super fast. With most other JAMstack apps this content is made using a Static Site Generator (SSG). Currently, there is no go-to SSG for Angular. BUT, this is because the Angular CLI does this already! That's right, just like every good(?) romantic comedy, what you needed was what you had this whole time but you thought you were just friends. When you run `ng build` the CLI is composing your files client-side. This is why you can immediately deploy the generated Angular CLI app to Netlify. You can even just rename your `dist` directory to `docs` and set a `base-href`to create a GitHub Pages site from your Angular app (there's also a module: [angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages)).

If you take a peek inside your `dist` folder you'll see it's your app's `index.html` file (pretty bare bones, usually) with script tags to pull in a bunch of JavaScript files. Although this is all compiled during build, typically generated static sites are HTML pages that are much more readable and SEO-friendly. Guess what, Angular already has that too by using [Angular Universal](https://angular.io/guide/universal)! Yes, your true love that was right under your nose the whole time also makes the most amazing nachos you've ever had _AND_ is down with re-listening to the Harry Potter series audiobooks at least once a year. This method isn't straightforward though. To stick with the rom-com theme, Angular has this hidden like the beauty of the pre-makeover-montage best friend. Your introduction to Angular Universal is:

"This guide describes Angular Universal, a technology that renders Angular applications on the server."

We want to avoid rendering on the server so this is confusing. If you dig a little deeper you can see that you can use Angular Universal to prerender your content by adding `:prerender` to your `build` and `serve` commands (i.e. `ng build:prerender`). Then you can add meta and title information with the `platform-browser` module.

The demand for Angular static site generation is growing. Thanks to [Christoph Guttandin](https://github.com/chrisguttandin) we also have a really handy, open-source prerender module, [angular-prerender](https://github.com/chrisguttandin/angular-prerender/). This module is looking at the information of your site, carrying out the server-side rendering, and merging the output into static content. The Angular team is actively working towards making this process easier from the core. As of writing this post, there is an [open pull request on the Angular Universal project to add prerendering scripts to the schematic](https://github.com/angular/universal/pull/1206).

### D is for Disclaimer

Wait a second, there's no 'D' in JAMstack. You're so observant! I just wanted to reiterate: JAMstack apps _do not have_ to use all of these technologies. The focus is more on the fact that you're leveraging tools that take away your app's dependency on being served with a web sever. This allows you and your team to focus on content your creating and not have to deal with the woes of infrastructure. This is the year of [sparking joy](https://www.youtube.com/watch?v=9AvWs2X-bEA), and the JAMstack gives you the opportunity to get back to the joy of unburdened frontend development.

## Breaking Down The Best Practices

Thankfully, there are also some best practices to help guide you through JAMstack land. Let's take a look at them from an Angular point of view.

- **Entire Project on a CDN** – A content delivery network allows you to distribute your resources so that they get to your users faster. There are many options for deploying your Angular site to a CDN. I have a post that covers [how to deploy with Netlify](https://www.netlify.com/blog/2019/09/23/first-steps-using-netlify-angular/?utm_source=blog&utm_medium=jamstack-angular-tzm&utm_campaign=devex) and one on [how to use the Angular CLI `deploy` command](https://www.netlify.com/blog/2019/09/17/using-the-angular-builder-for-netlify/?utm_source=blog&utm_medium=jamstack-angular-tzm&utm_campaign=devex) for more information. (Side note: although Netlify is a great CDN, we also offer tons of other features like analytics, serverless functions, identity, and more to help you with everything from local development to global deployment!)

- **Everything Lives on Git** – How ✨magical✨ is version control?! I don't know how I ever coded without it. The reason it's a best practice on the JAMstack is _not solely_ for the fact that it lets us revert our code, let alone immutable builds, back to when we didn't break everything. It is also because having a git workflow makes it easier to share, manage, and contribute to our projects.

- **Modern Build Tools** – The technology we use changes at a dizzying pace but we can rely on modern build tools to help us adapt to those changes. Angular already uses webpack through the CLI and you don't _have_ to make any changes to a standard app.

- **Automated Builds** – Since we are creating prebuilt content, only on new builds do we push up new updates. If we create automated builds we can assure that we are getting the most up-to-date content as soon as it's created. You can do this with webhooks, creating an npm script to use [`ng deploy`](https://angular.io/cli/deploy) every time you run a production build, or, easier yet, [connect your project repo to Netlify](https://www.netlify.com/blog/2019/09/23/first-steps-using-netlify-angular/?utm_source=blog&utm_medium=jamstack-angular-tzm&utm_campaign=devex) to trigger a build with each commit.

- **Atomic Deploys** – Whenever I think of atomic, my brain only renders this image:

![an atomic fireball candy](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1570637540/fireball_rm1blo.jpg)

I could never take the heat and always bailed 10 seconds in. Atomic deploys, on the other hand, are in it 'til the end. They wait until every file is uploaded before launching your site to make sure there are no inconsistencies and no missing information.

- **Instant Cache Validation** – In the same respects of atomic deploys, instant cache validation wants to make sure there is no stale information on your page. As soon as the new version of your site is uploaded, the cache is cleared so only the new data is delivered. This is something that can be handled by your CDN.

## And I Hope You Like Jammin' Too

That wraps up this episode of, "What doe this new tech term mean?" I hope this helped you understand the JAMstack better. I'm very excited about this new way of developing and delivering sites. I really do believe it's putting us on a path towards better performance _AND_ better development experience. The JAMstack has definitely sparked joy in me and renewed my excitement in programming. I'm not only the writer of this post, I'm also a client 😃👍.

Today we:

- Looked at the high-level definition, process and benefits.
- Covered what the J, A, and M were made of for an Angular JAMstack project.
- Discussed the best practices of creating a JAMstack application.

If you have questions, [our community](https://community.netlify.com?utm_source=blog&utm_medium=jamstack-angular-tzm&utm_campaign=devex) is a great place to talk to other JAMstack devs or my teammates and I. You can find some great resources on there too. Here's a list of other resources that may help you on your JAMstack journey:

- [The JAMstack website!](https://jamstack.org/)
- [Modern Web Development on the JAMstack book](https://www.netlify.com/oreilly-jamstack/) by Mathias Biilmann & Phil Hawksworth
- [The State of the JAMstack Nation talk](https://www.youtube.com/watch?v=COAVmST41Q0) from Sarah Drasner
- [The New Dynamic](https://www.thenewdynamic.org/)

I'm very excited to see everything that you create with Angular and the JAMstack. Happy coding!
