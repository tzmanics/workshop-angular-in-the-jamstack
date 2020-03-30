---
title: First Steps Using Netlify & Angular
description: >-
  A guide to connecting and deploying Angular applications with the Netlify UI
  and CLI.
authors:
  - Tara Z. Manicsic
date: "2019-09-23"
topics:
  - tutorials
tags:
  - Angular
tweet: ""
format: blog
publish: true
canonical_url: https://www.netlify.com/blog/2019/09/23/first-steps-using-netlify-angular/
---

# First Steps Using Netlify & Angular

Well, hello there! Welcome to the start of your journey with Netlify and Angular. We're so happy to have you! At Netlify we want to empower you to make awesome web projects with ease; from local development to global deployment. In this post I'll walk you through the first steps of connecting and deploying your Angular application with our web UI (user interface aka website) and the Netlify CLI (command line interface) tools. If you have any questions or comments check out [our community](https://community.netlify.com) for answers from our team and fellow Netlify users. Let's get started!

## Using Netlify's Web UI

When you first go to [netlify.com](https://www.netlify.com) you can connect your account to a git repository by signing into [GitHub](http://github.com/), [GitLab](https://gitlab.com), or [Bitbucket](https://bitbucket.org). Netlify does the work to link your account to your repositories. First, go to your Sites page (https://app.netlify.com/teams/<your team name>/sites) and click the 'New site from Git' button. This will open up your Git account of choice and list all the projects from that account. Next, you just need to select the project, choose the branch and fill out the build command and publish directory.

<iframe width="560" height="315" src="https://www.youtube.com/embed/H8t_olktbAI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

For Angular, the build command is, most likely `ng build --prod`. You can definitely set the [environment flag](https://angular.io/guide/build#configuring-application-environments) to whichever is best suited for your particular project. If you're curious, you can also check out more information about the Angular CLI's `ng build` command [here in their docs](https://angular.io/cli/build). The publish directory is asking for the folder that your project lives in. When using the `ng build` command with the Angular CLI the project is saved in the `dist` (short for distributable) folder under the project name. If you customized where you wanted your project build output, you'll want to list that location instead.

> Just to recap, the setup with most commonly be:
>
> **Build command**: ng build --prod
>
> **Publish directory**: dist/{project name} (e.g. dist/anglify)

That is all the information needed to deploy your Angular project onto Netlify using the web UI. Once that's setup and a deploy is started you can track the progress and see the logs on your project's overview (https://app.netlify.com/sites/{project name}/overview) or deploys (https://app.netlify.com/sites/{project name}/deploys) page. You can also find the link for your site on those two pages.

![the site overview screen](/img/blog/screen-shot-2019-09-19-at-12.26.21-pm.png "overview page")

### Deploying, Three Ways 😙👌

One of the easiest ways to deploy your site once you have it hooked up to your project's git repo is to push a commit. When connecting through your repo Netlify automatically sets you up with a CI/CD (continuous integration/continuous deployment) pipeline. Check out more information about Netlify's continuous integration [in our docs](https://www.netlify.com/docs/continuous-deployment/). You can also just trigger a deploy by going to your project's deploy page and clicking the 'Trigger deploy' button. This button gives you the option to simply trigger a deploy or clear your cache then deploy your site. Finally, if you don't want to push code _or_ push buttons you can just drag and drop your project folder (e.g. `dist/{project-name}`) onto this section of your deploys page:

![drag and drop section on the deploys page](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1568817659/dragndrop_tv0ocu.jpg)

There are your web UI options for deployment. Now, let us mosey on over to my favorite place, Terminal Town 👩🏻‍💻!

## Using Netlify's CLI

As an Angular user, I felt very spoiled with all the work the Angular CLI does (generating components (`ng generate`), integrating packages (`ng add`), updating itself (`ng update`), etc.). I was very happy to know that I could stay on the command line using [Netlify's CLI](https://www.netlify.com/docs/cli/).

> By the way, the Netlify CLI is an open source project ✨. [Come join the fun!](https://github.com/netlify/cli)

The CLI can be installed using your package manager of choice and, if you like, you can install it globally using the `-g` flag. To connect to your account you just run `netlify login`.

_code to run on the command line_

```bash
npm install netlify-cli -g && netlify login
```

Once you're logged in you can go to your project's directory and run `netlify init` to get it set up on Netlify. You will have the option to either connect it to one of your existing Netlify sites or create and configure a new site. If the project has a git remote repo assigned to `origin` the CLI will find it and ask if you want to use it to link up your site. There are other options though. You can find the site by searching, listing your recently updated sites, or by using your site ID. That's all there is to linking the project to your Netlify account. So, with the Netlify's default continuous deployment, if you push to that repo it will automatically deploy your site! Easy like Sunday morning (which, hopefully, are very easy for you).

<iframe width="560" height="315" src="https://www.youtube.com/embed/TU8InQba0lI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

If you're really excited and want to get your site deployed before you've even created a git repo, you can! Just like before, you just need to run `netlify init` but this time when it sees no Git repo it will call it out. The CLI ask you to either chose the option to deploy the site manually or go create one. After choosing to manually deploy, it will ask you for some information about the project then add it to your account. From this point you can now just run `netlify deploy` per usual.

By default, `netlify deploy` will deploy your project to a _draft_ url. This information along with the link and build information is all listed in the output after you run the `deploy` command. We wanted to make sure you explicitly want the deploy to be production. So when your site is for sure, for sure ready you'll want to add the `--prod` flag. After you run `netlify deploy --prod` it will ask for the Publish directory.

> You can set your build settings in a `netlify.toml` configuration file so it stops nagging you 😛about the Publish directory on each deploy. Check out the [docs](https://www.netlify.com/docs/netlify-toml-reference/) to learn more.

Once the deploy is started, it will output the Admin URL (for status, logs, and more), the live URL, and the Site ID.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fcnSP2CPuSw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## So Deployable

Now you have the first steps to showing the world your amazing Angular creations:

- linking to your Git repos
- which, in turn, adds continuous deployment
- deploying from commit pushes, triggered deploys or drag n drop deploys
- installing the netlify cli
- linking and deploying projects from said netlify cli

There is _so much_ more you can do with both the web UI and the Netlify CLI. Now that you have your projects set up and you did an amazing job deploying them (you smart cookie), I highly recommend checking out [our docs](https://www.netlify.com/docs/).

Here are some other resources that will help you on your path to being even more skilled than you already are 😍:

- A [blog post](https://www.netlify.com/blog/2019/09/17/using-the-angular-builder-for-netlify/) about using the Angular builder for Netlify by ME!
- Check out these [helpful hints](https://www.netlify.com/docs/#helpful-hints) to help you in your Netlijourney.
- To have a blast with the CLI, I recommend checking out both [our docs](https://www.netlify.com/docs/cli/) and our [repo](https://github.com/netlify/cli).

Happy coding, everyone!
