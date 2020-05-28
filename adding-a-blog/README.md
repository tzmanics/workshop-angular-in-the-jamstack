# Adding a Blog

Can you guess what we're going to do in this section of the workshop? That's right it's time to build out a blog for our website. Many company websites have a blog because it's a great way to keep your users updated on your company, your product, and technology or happenings in your community.

Thankfully, [Scully](http://scullyio.com/) gives us a super simple way to create a pre-rendered blog with Angular.

## Directions For a Fresh Start

> 🛑✋ skip these steps if you're continuing the workshop from another section and don't need a fresh start 🤚🛑

### Installing the Base Scully Project

We want to hit the ground running so we'll clone a project that has the base Angular application, Scully installed, and Netlify configurations added via a [`netlify.toml` file](https://docs.netlify.com/configure-builds/file-based-configuration/?utm_source=workshop&utm_medium=ng-in-jamstack-tzm&utm_campaign=devex).

> [🐙 Here's the link to the base Scully project repo.](https://github.com/tzmanics/base-scully-project)

If we want to differentiate this project from future projects using `base-scully-project` we can change the name when we clone it. To do these we just need to add the name after the repo link in the `clone` command. Like so:

```bash
git clone https://github.com/tzmanics/base-scully-project adding-a-blog
```

Move into the project directory and run `npm i` to install all the dependencies. The we'll run the project's build script we made in a [previous section](https://github.com/tzmanics/workshop-angular-in-the-jamstack/tree/master/prerendered-home-page#adding-scully) to make sure everything is running ok

```bash
cd adding-a-blog
npm run jam
```

We can see this script in the project's [package.json file](https://github.com/tzmanics/base-scully-project/blob/393b653516743aca839b45c47d717439e4d45ec0/package.json#L13). Unraveling it here, the script runs `ng build` and `npm run scully serve`. This will build out the Angular project then run Scully and serve it at [http://localhost:1668/](http://localhost:1668/). If we head to go to that URL we'll see our base Scully project!

> 🚑 If the site isn't running at localhost, try stopping the served site with `control + c`. Then run `ng build`, once built, run `npm run scully serve`. Yes, these are the same commands but sometimes it makes a difference becuase...technology.

![screenshot of base Scully project](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1590638248/Screen_Shot_2020-05-27_at_10.50.48_PM_zkkddd.jpg)

### Git-ing Ready

Since we cloned the project it is already linked to a Git repo: https://github.com/tzmanics/base-scully-project but we can change that to wherever we please. To do this we'll just [create a new repo](https://help.github.com/en/github/getting-started-with-github/create-a-repo) and copy the URL or grab the URL of an existing repo we love. Then we'll run a few git commands to replace the existing linked repo.

```bash
git remote rm origin
git remote add origin https://github.com/tzmanics/adding-a-blog
```

Finally we can push up the code we have to the new repo.

```bash
git push --set-upstream origin master
```

### Netli-link

For quick deploys we'll hook this project up to Netlify using [`netlify init`](https://docs.netlify.com/cli/get-started/?utm_source=workshop&utm_medium=ng-in-jamstack-tzm&utm_campaign=devex#automated-setup). If you have a Netlify account it will step through choosing or creating a project. If you don't, this step will also walk through creating an account.

```bash
netlify init
```

Running this command will also ask us for the project's build command and publish directory. Looking again at the project's [package.json](https://github.com/tzmanics/base-scully-project/blob/393b653516743aca839b45c47d717439e4d45ec0/package.json#L13) we see there is a `jam-prod` that is the same build command but uses `ng build --prod` for production deploys. This script also uses `npm run scully` without the serve command. We want to use this script bc we don't need to _serve_ Scully when we deploy it live. That would be silly.

For the publish directory, unless you change something Scully will always build out the project in `dist/static`. With this in mind this is what we'll pass to the Netlify setup:

- build command: `"npm run jam-prod"`
- directory to deploy: `"dist/static"`

Now that we have that set up, any time we change code and push it, it will trigger a Netlify deploy. We can run `netlify open` to see the project build logs and URL information.

```bash
netlify open
```

![screenshot of Netlify site dashboard](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1590643663/Screen_Shot_2020-05-28_at_1.26.45_AM_tuafk1.jpg)

😅 Phew, with that, we are ready to jump into adding a blog!

## Codin' Time

Now that you've either got a new setup or have done the daunting task of skipping that last section (because you're all set up from a different workshop section), we're all set to add a blog.

## Build a Blog

To build out all the scaffolding for the blog we can run [Angular's generate command](https://angular.io/cli/generate) passing in the path to Scully blog command:

```bash
ng generate @scullyio/init:blog
```

This command will do a couple of things:

- create a `blog` directory at the project's root
- create a sample markdown blog with today's date as the title
- adds a `blog/:slug` route to the Scully config
- adds the `blog` route to the main routing module
- adds the routes for each post to the blog components routing module
- adds a blog module with styling and logic for the posts

It lists all this in the output as well.

![screenshot of Scully blog generate output](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1590646921/Screen_Shot_2020-05-28_at_2.09.07_AM_mepsij.jpg)

## Find the Blog

If we serve this up now, we wouldn't see any changes. What fun is that? We don't have the link setup to see the blog. We'll want to add a root module for all the blog posts to live and then add it to our navigation.

We can run another generate command to add this home for the blog posts:

```bash
ng generate module blogRoot --route 'blogRoot' --module blog
```

Here we're making a module names `blogRoot`, passing a `blogRoot` route, and setting the module as the `blog` module. Once that is generated we'll actually go change the generated route in `blog-routing.module.ts`:

```ts
// src/app/blog/blog-routing.module.t

  {
    path: "",
    loadChildren: () =>
      import("../blog-root/blog-root.module").then(m => m.BlogRootModule),
    pathMatch: "full"
  },
  ...
```

![screenshot of blog page](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1590651384/Screen_Shot_2020-05-28_at_3.35.43_AM_ectuzb.jpg)

Now we can go to our blog page but we haven't populated that page with anything!

## Poppin' Off Posts

To get some content into our blog we can generate a few posts using yet another amazing generate command. This command will call on Scully's post generation code and we can pass a `name` flag.

```bash
ng g @scullyio/init:post --name="First post"
```

The CLI will prompt "What's the target folder for this post?" We'll go with the default "blog" directory that we created with the generate blog command. In the future we can make specific folders for posts, even nested folders. Scully recursively looks for different routes so however far you nests your posts 🕵🏻‍♀️ Scully will find them.

Create as many blog posts as you like with as much or as little content as you wish.

To check these out locally we need to run a few commands:

```bash
ng build
npm run scully
npm run scully serve
```

Now that we've run Scully, if we take a look at the generated content for the blog posts you'll see that there is just [front matter](https://jekyllrb.com/docs/front-matter/) and an h1 header. To start with the front matter has `published` set to `false` so that it won't show up in production. BUT Scully also sets a temporary slug so you can share these posts with reviewers to get feedback.

```yml
---
title: 'First post'
description: 'blog description'
published: false
slugs:
  - ___UNPUBLISHED___kaqhhehs_aXAII6EIopXJhFVBANsZhqzIgLAlTanr

---
# First post
```

> 🧠 tidbit: using this `slug` field let's you override the URL path to the blog post, so you can set it to whatever you like.

We can add this slug to [http://localhost:1668/blog/](http://localhost:1668/blog/) to see what the post looks like. So, with the post above the URL would be `http://localhost:1668/blog___UNPUBLISHED___kaqhhehs_aXAII6EIopXJhFVBANsZhqzIgLAlTanr`.

![screenshot of blog post preview](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1590654441/Screen_Shot_2020-05-28_at_4.24.57_AM_zrem6n.jpg)

It looks so good let's see all these posts live and published.

## Postin' Posts

First, we can edit the front matter on all the posts we made to change `publish` to `true` and remove the temporary slug. Adding a few other pieces to the front matter will also give us more fields to be able to display. For now, we'll add date, authors, description, and some more content. This is what it will look like now:

```yml
---
title: 'First post'
description: The first post is the deepest!
published: true
date: '2020-02-22'
authors:
  - Tara Z. Manicisc
  - Toshi
---
# First post

Well, hello there! Welcome to the start of your journey with Netlify and Angular. We're so happy to have you! At Netlify we want to empower you to make awesome web projects with ease; from local development to global deployment. In this post I'll walk you through the first steps of connecting and deploying your Angular application with our web UI (user interface aka website) and the Netlify CLI (command line interface) tools. If you have any questions or comments check out [our community](https://community.netlify.com) for answers from our team and fellow Netlify users. Let's get started!
```

### Page of Posts

Now we get to see our posts on a page! First, we need to edit the `blog-root.component.html`. In this file we'll add a `div` to hold a list of our posts. Inside that list we'll call on `*ngFor` to have it make a list item for each post.

```html
<!-- src/app/blog-root/blog-root.component.html -->

<h1>The Latest Jamgular Posts</h1>
<div class="blog-posts">
  <ul>
    <li *ngFor="let post of posts$ | async">
      <hr />
      <a [routerLink]="post.route">
        <div class="post-card">
          <h2>{{ post.title }}</h2>
          <p>{{ post.date }} | {{ post.authors }}</p>
          <b>{{ post.description }}</b>
        </div>
      </a>
    </li>
  </ul>
</div>
```

We need to pass in posts so that we have something to iterate over. We can do this inside the `blog-root.component.ts` file. Thankfully, Scully gives us [`ScullyRoutesService`](https://scully.io/docs/scully-lib-core#router-service) that lets us access all of the routes of the site. We can then filter those routes to only get the ones that start with `/blog`.

```js
// src/app/blog-root/blog-root.component.ts

import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog-root',
  templateUrl: './blog-root.component.html',
  styleUrls: ['./blog-root.component.scss']
})
export class BlogRootComponent implements OnInit {
  constructor(private scully: ScullyRoutesService) {}
  posts$: Observable<ScullyRoute[]>;

ngOnInit() {
  this.posts$ = this.scully.available$.pipe(
    map(routeList => {
      return routeList.filter((route: ScullyRoute) =>
        route.route.startsWith(`/blog/`)
      );
    })
  );
}
```

To see what these look like. We want to run a few different commands:

- `ng build`: to build out the Angular project
- `npm run scully -- --scanRoutes`: to have Scully look for new routes & process new info
- `npm run scully serve`: to see the update locally

As fun as it would be to type all of that, why don't we make a new script to run all of those whenever we need it. In the project's `package.json` site we'll just add:

```json
"scripts": {
  "jam-it": "ng build && npm run scully -- --scanRoutes && npm run scully serve",
```

Then we just need to run `npm run jam-it`.

> [🐙 Here is the commit where we added the new script.](https://github.com/tzmanics/adding-a-blog/commit/0976bb624b9a144579a3306db7ec463e90d03e59)

When we run that we can open up [http://localhost:1668/blog](http://localhost:1668/blog). To see we have all the blog posts! And, buddy, do they look silly!

![screenshot of current state of posts](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1590659448/Screen_Shot_2020-05-28_at_5.50.08_AM_firrch.jpg)

Thankfully, we have CSS to the rescue!

## Style. That. Post!

First, we're going to add some styles to the main style sheet to style the links and list items.

```scss
// src/style.scss

a {
  color: black;
  text-decoration: none;
}

a:hover,
a:visited {
  color: rgba(0, 0, 0, 0.5);
}

li {
  list-style: none;
}
```

This will neutralize the link colors.

Then inside the `blog-root` component we 'll add some styling for the posts.

```scss
// src/app/blog-root/blog-root.component.scss

.blog-posts {
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 auto;
  padding: 20px;
  width: 50%;
  li {
    margin-bottom: 30px;
  }
}
```
