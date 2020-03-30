# Setting Up Our Base Project

In this step we'll take a base Angular project with a couple routes and get it setup to become a beautiful Jamstack application. "What does that entail?", you ask.

- cloning the project locally
- setting up a git repository
- connecting the project to Netlify using their CLI
- add the netlify-schematics to create a config file
- checking out our awesome deployed site

Before we jump into the code lets look at some Jamstack best practices we're putting into play with this process.

### Entire Project on a CDN

We've touched the topic of Content Delivery Networks (CDNs) but what exactly are they. The easiest, most high-level way that made sense to me is that they are servers without the complex logic. These dumb servers (rude, I know) are globally distributed and have the ability to re-route content. The global redundancy allows data to travel fast, and stay close to where the users accessing it is.

This, does not solve global latency because a solution does not exist. The best solution to latency is finding the person who wants to view your site, and showing them your site from your laptop. I also find this "solution" to be super uncomfortable, so I definitely choose the CDN option. All this to say, globally distributed CDNs, that can re-route your content if anything goes wrong offer a reliable and fast solution to delivering your content.

There are even more powerful CDN services that providers are offering now. Your CDN provider can also pre-render pages, run build, provide automatic deploys, rollback, cache invalidation, and git-integrated CI/CD.

### Everything Lives on Git

Did someone say Git? I love Git. It's because just the rudimentary functions of Git are to make the developer experience not suck. All I'm saying is that the ability to `git reset HEAD --hard` has saved my from throwing my computer out a window on many occasions. This isn't the only reason for the Jamstack approach to rely so heavily on Git.

Having your project live on Git makes it accessible to many developers and organizes contributions so that development can happen faster and more smoothly. If Janelle wants to change the user interaction on the company blog. She can clone or fork the repo, make a PR for the changes, and once she gets a review push the changes to trigger a production build and make her changes live.

The Git workflow allows you to have a continuous, immutable and atomic deployment process. These all work hand-in-hand to help developers code fast and _NOT_ break things. Or at least be able to roll it back if you do, inevitably, break something.

![erase all pictures of ron gif](https://media3.giphy.com/media/bN4mdVrlylv5S/giphy.gif?cid=ecf05e4793f45f649c17a092a69047d0e5ddc9512c137d0b&rid=giphy.gif)

### CI/CD as Easy as 1-2-3

As we'll see in this exercise we can automate the deployment process to the CDN. We'll use Netlify's process because it's as simple as feeding in your build command and output directory. Behind the scenes the work is done to find your repo, and listen for a push of code to trigger a build. Automating steps like this cuts out tedious processes in the development process. If only more things in life could be automated, like cutting your nails. I mean you cut 'em once and then there they are again.

Okay, there are more resources for further reading at the end og this page. Let's jump into the code!

# Time to Code

To start of we'll clone the base project locally. Since there are many different parts to this workshop you can either choose to make a directory for each section or build one project that has all the enhancements. Either way, for this step create a directory and clone the project inside.

```bash
mkdir jamstack-workshop && cd jamstack-workshop
git clone https://github.com/tzmanics/base-project
```

> 🐙 tip: if you'd like to name the project something else simply use the above command followed by the name you'd like: `git clone https://github.com/tzmanics/base-project cooler-name`

### Git Going

Now that we have local project, we'll want to make sure we set up git version control for it. Not that anyone here makes mistakes. Create a new repo and copy the link to your clipboard.

![git hub new repo screenshot](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1585538801/Screen_Shot_2020-03-29_at_11.25.50_PM_xnlafj.jpg)

Since the base project is already a git project we don't have to run the usual `git init`. It does already have its `origin` set up to the repo we cloned it from. So, we'll want to remove that and add the new repo that we've just created.

```bash
git remote rm origin
git remote add origin <the link to your repo>
```

So, my new origin would be set like this:

```bash
git remote add origin https://github.com/tzmanics/base-project_final.git
```

Then we'll want to push up everything we have now so we can start with a clean slate. On the first push we'll need to set the upstream. The [upstream](https://devconnected.com/how-to-set-upstream-branch-on-git/) is the branch that's tracked on the remote repository by the local remote branch. Right now we are going to set this to `master`, which is common. The syntax is:

```bash
git push --set-upstream <remote> <branch>
```

We just named our remote branch `origin` and we're are currently doing all our work on the `master` branch. Therefore the command we'll use for this initial push will be:

```bash
git push --set-upstream origin master
```

Alright we are git'ing there. Git it?

![sensible chuckle gif](https://media.giphy.com/media/9EwnzGNjvmIG4/giphy.gif)

### A B CDN

Now that we have our site locally and have it version-controlled remotely, lets see what it looks like live. To do this we'll actually be connecting Netlify to the project repository we just created. We'll do this using the Netlify CLI. Let's install that then run the `login` command.

```bash
npm i netlify-cli -g
netlify login
```

This command will open up a browser window and walk you through the login process. If you don't have an account yet there is a sign up option below the login box. Once, we have that squared away we can run the `init` command from out projects directory. This command will ask us a few questions about hooking up this project to a current Netlify project or a new one. Then it will ask what build command we want to use and where the project will live once built.

1. Connect to existing project or new? If you have an existing Netlify project feel free to connect to that, otherwise we'll be creating a new onw.

2. Selecting the team you want this project to live under. Chances are you are your only team, party of 1.

3. Choose whichever site name you would like 😀.

4. The build command will be the standard Angular `ng build --prod`.

5. Since this project name is already set to `base-project` when you run the build command it will save the project to `dist/base-project`.

![netlify init output](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1585542192/Screen_Shot_2020-03-30_at_12.22.40_AM_bfusmd.jpg)

Netlify will take all information and use it to build and deploy the project to the CDN. We can run `netlify open` which will open a browser window to our project's dashboard. From there was can preview the build. Once it's done building we now can see our live site at <project name>.netlify.com ([https://base-project.netlify.com/](https://base-project.netlify.com/) 👈 here's my link).

### Some Schematics Antics

Although, we can see our site is live. There is some funny business with the redirects when serving an Angular site. Once the site is built the `index.html` page is served and goes to the correct route for each link. Yet, on a refresh the path to the correct page is lost. Don't fret though, I have an easy solution: [netlify-schematics](https://github.com/tzmanics/netlify-schematics).

These schematics will set up a configuration file that handles the redirects and also saves the build command and project directory information. Netlify has those last two pieces of data saved from the `init` command we ran, but the config makes for a good place to change that information (#foreshadowing). Let's get these schematics added.

```bash
ng add netlify-schematics
```

This command will run you through a few prompts. For now we'll just answer the first two about the build command and directory and hit enter for the rest.

![netlify schematics output](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1585543751/Screen_Shot_2020-03-30_at_12.47.28_AM_q1fgdg.jpg)

Now, we'll have a `netlify.toml` file in our base directory with this information:

```toml
[build]
  publish = "dist/base-project"
  command = "ng build --prod"
[[redirects]]
  from="/*"
  to="/index.html"
  status=200
```

### Push and Publish

As we talked about before, we have set up CI/CD for this project just by connecting it to Netlify. So, if we add, commit and push the code changes we've made a new build of our site will be triggered.

```bash
git add .
git commit -m 'adds netlify init and config files'
git push
```

Now, when you go to your live site and refresh any and all of your routes, it will know where to go!

## Resources for the Road

You made it! Here are some great resources to build your brain on this topic 💁🏻‍♀️

- [What more can a CDN do on the JAMstack?](https://dev.to/shortdiv/what-more-can-a-cdn-do-on-the-jamstack-5cgj)
- [Netlify Edge: CDN](https://www.netlify.com/products/edge/?utm_source=repo&utm_medium=angular-workshop_tzm&utm_campaign=devex)
