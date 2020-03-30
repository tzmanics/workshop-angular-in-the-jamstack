# Angular in the Jamstack: From "i dunno" 🤷🏻‍♀️ to pro 💁🏻‍♀️!

Welcome to the workshop! The Jamstack is a fairly new concept that is getting a lot of buzz because people using it are seeing great improvements in site speed and development experience. I could go on about it...and that's exactly what I'll do in this workshop. You're welcome.

This workshop will thoroughly review the main methods and best practices of the Jamstack while we code out an enterprise-level site. The goal is to make you comfortable enough with the Jamstack that you can explain to the rest of your team.

Angular has recently been making its debut into the Jamstack ecosystem. These two technologies bring so much to each other. Of course, I don't need to tell you the greatness of Angular but we will cover this budding relationship later on in further detail.

## The Workshop Agenda

Each section of the workshop will cover an aspect of creating a Jamstack application with Angular. In each directory we'll look into the Jamstack strategy and best practice. After that will be a step-by-step walk-through so we can put these ideas into practice.

Here's what we'll cover:

0. [Workshop Setup](https://github.com/tzmanics/workshop-angular-in-the-jamstack/tree/master/_step-0_setup)
1. [What is Angular in the Jamstack?](https://github.com/tzmanics/workshop-angular-in-the-jamstack/blob/master/README.md) (you are here)
1. [Building a Base Project](https://github.com/tzmanics/workshop-angular-in-the-jamstack/tree/master/_step-1_base-project)
1. [Pre-rendering the Home Page](https://github.com/tzmanics/workshop-angular-in-the-jamstack/tree/master/prerendered-home-page)
1. [Adding a Contact Form](https://github.com/tzmanics/workshop-angular-in-the-jamstack/tree/master/add-contact-form)
1. [Adding a Pre-rendered Blog](https://github.com/tzmanics/workshop-angular-in-the-jamstack/tree/master/adding-a-blog)
1. [Adding Identity for Login/Sign up](https://github.com/tzmanics/workshop-angular-in-the-jamstack/tree/master/adding-identity)
1. [The Wrap Up & Resources]()

## What is the Jamstack?

> Fast and secure sites and apps delivered by pre-rendering files and serving them directly from a CDN, removing the requirement to manage or run web servers.

### The Main Concepts

The Jamstack isn't really talking about a technology stack in the way that we may be most familiar with. Instead it's more of an architectural approach the way we build websites. The main concepts of this approach are:

- generating pre-rendered, cache-able, static assets
- deploying to a Content Delivery Network (CDN)
- using modern tools like serverless function, third-party APIs or client-side JavaScript to add dynamic interactions and data

Not all of these steps _have_ to take place to be awarded the Jamstack seal of approval. Developing a Jamstack site is much more about taking advantage of these methods where you can. Striving to deliver your content as fast and secure as possible while making the development experience not painful, dare I say, even enjoyable.

### Best Practices

One of the ways it helped me to wrap my mind around the goals of a Jamstack architecture was learning the best practices.

- From [Jamstack.org](https://jamstack.org/best-practices/)

> Entire Project on a CDN
> Because Jamstack projects don’t rely on server-side code, they can be distributed instead of living on a single server. Serving directly from a CDN unlocks speeds and performance that can’t be beat. The more of your app you can push to the edge, the better the user experience.

> #### Everything Lives in Git

> With a Jamstack project, anyone should be able to do a git clone, install any needed dependencies with a standard procedure (like npm install), and be ready to run the full project locally. No databases to clone, no complex installs. This reduces contributor friction, and also simplifies staging and testing workflows.

> #### Modern Build Tools

> Take advantage of the world of modern build tools. It can be a jungle to get oriented in and it’s a fast moving space, but you’ll want to be able to use tomorrow’s web standards today without waiting for tomorrow’s browsers. And that currently means Babel, PostCSS, Webpack, and friends.

> #### Automated Builds

> Because Jamstack markup is prebuilt, content changes won’t go live until you run another build. Automating this process will save you lots of frustration. You can do this yourself with webhooks, or use a publishing platform that includes the service automatically.

> #### Atomic Deploys

> As Jamstack projects grow really large, new changes might require re-deploying hundreds of files. Uploading these one at a time can cause inconsistent state while the process completes. You can avoid this with a system that lets you do “atomic deploys,” where no changes go live until all changed files have been uploaded.

> #### Instant Cache Invalidation

> When the build-to-deploy cycle becomes a regular occurrence, you need to know that when a deploy goes live, it really goes live. Eliminate any doubt by making sure your CDN can handle instant cache purges.

### The Benefits

There are three main benefits I want to touch on here: performance, cost, and developer experience. [Cornerstone](https://www.netlify.com/blog/2019/07/02/cornerstone-ondemand-delivers-web-projects-30-faster-with-netlify/) went from monolithic CMS to the Jamstack using Gatsby, Netlify, and Sanity.io and saw their page loads are 25% faster with time to market improving by 30%. [Smashing Magazine](https://www.netlify.com/blog/2017/03/16/smashing-magazine-just-got-10x-faster/) migrated their site and brought their time to first load from 800ms to 80. One more, [Perfect Keto](https://www.netlify.com/blog/2019/05/16/wayfx-deploys-lightning-fast-headless-wordpress-to-netlify/) adopted a Headless WordPress architecture with Netlify and saw a 6x performance boost, with average load time going from 6.2s to 750ms.

Costs are lowered thanks to the Jamstack approach to a simpler technical architecture. Traditional architecture may come with costs for estimated server usage (a mental feat in itself),highly specified servers for databases, application servers, caching servers, load balancers, message queues, and more. The Jamstack relies on CDNs in stead of traditional servers and it falls on the CDN to handle scaling for site traffic. In the case of [Citrix](https://www.netlify.com/blog/2019/06/12/jamstack_conf-nyc-session-recap-citrix-delivers-better-ux-with-less-overhead-using-jamstack-and-netlify/) they reduced their costs by 65% because they improved development process put the ahead of production schedule.

The improvement in development experience spans the levels of technical ability. The Jamstack architecture allows for the more tech savvy to stay in the code, pushing and pulling content via the terminal or inside Git repos. Then for those who aren't as comfortable in that realm they can still contribute via headless CMSs. Both of these approaches can be interlaced. For instance, at Netlify our blogged is powered by the Netlify CMS. There is a UI that has an editor but pushed all content to GitHub. We have the option to either pull down the code from the repo or edit inside the CMS UI.

## What is Angular in the Jamstack?

The Jamstack brings a lot of benefits to Angular development. Delivering pre-rendered content allows for better SEO performance, smaller package sizes, and a more streamlined workflow. As you'll see in this workshop we can take an Angular project in a git repo, pre-render the content using the Angular static site generator, [Scully](http://scullyio.com/), and hook the repo up to Netlify to deploy it to a CDN and initiate atomic deploy on each git push.

If we're being totally honest, Angular is the one of the last to arrive at the Jamstack party. That doesn't mean that Angular is at any kind of disadvantage. We're already seeing the Angular ecosystem start to form around the Jamstack. Angular developers were asking for a trail to pre-rendered content, better SEO performance, and many other things we see in the Jamstack. They just didn't know it had a name.

### Put it All Together

The Jamstack is breaking through the JavaScript community and it's about time we take advantage of what it can do for Angular and Angular devs. The first step comes from understanding what the Jamstack is and how we utilize this new architectural approach. The best thing to remember is these are all familiar pieces: serving HTML files, third-party APIs, Git, serverless functions. The Jamstack approach orchestrates all these pieces utilizing the latest technologies with the goal or performance and developer experience at the forefront.

## Today

That brings us to this workshop today. One of the best ways to learn is to be taught. Haha but also do actually code out a site starting with taking a base project and throwing it on a CDN all the way to utilizing serverless function and decoupled processes to spin up user interactions and collect data.

Let's get started

## Resources for the Road

Here are some gems to learn even more about the Jamstack!

- [WTF is the Jamstack? Move past the label & build better websites.](https://www.learnwithjason.dev/blog/wtf-is-jamstack/)
- [The Jamuary Feed on dev.to](https://dev.to/t/jamuary)
