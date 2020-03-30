---
title: Creating an Angular Detector for the Netlify CLI
description: >-
  This post walks you through how to create a project type detector for the
  Netlify CLI using the Angular detector as an example.
authors:
  - Tara Z. Manicsic
date: "2020-02-21"
topics:
  - tutorials
tags:
  - Angular
  - CLI
  - open source
tweet: ""
format: blog
seo:
  metadescription: >-
    This post walks you through how to create a project type detector for the
    Netlify CLI using the Angular detector as an example.
  metatitle: Creating an Angular Detector for the Netlify CLI
  ogimage: /img/blog/screen-shot-2020-02-19-at-9.08.20-pm.jpg
publish: true
canonical_url: https://www.netlify.com/blog/2020/02/21/creating-an-angular-detector-for-the-netlify-cli/
---

# Creating an Angular Detector for the Netlify CLI

The CLI at Netlify can detect project types to help make the user experience catered to that specific type of project. On my journey to make the Angular developer experience better I created the [Angular detector](https://github.com/netlify/cli/blob/master/src/detectors/angular.js). It was so easy I wanted to show you how to do it as well, so you can make detectors of your own if you fancy. After all, [our CLI is open source](https://www.netlify.com/blog/2018/09/10/netlify-cli-2.0-now-in-beta/?utm_source=blog&utm_medium=cli-detector-post_tzm&utm_campaign=devex)!

## It's Just One File

The detector only consists of one JavaScript file and this is what it looks like for the Angular detector:

```js
const {
  hasRequiredDeps,
  hasRequiredFiles,
  scanScripts
} = require("./utils/jsdetect");

module.exports = function() {
  // REQUIRED FILES
  if (!hasRequiredFiles(["package.json"])) return false;
  if (!hasRequiredFiles(["angular.json"])) return false;
  // REQUIRED DEPS
  if (!hasRequiredDeps(["@angular/cli"])) return false;

  /** everything below now assumes that we are within angular */

  const possibleArgsArrs = scanScripts({
    preferredScriptsArr: ["serve", "start", "build"],
    preferredCommand: "ng build --prod"
  });

  if (possibleArgsArrs.length === 0) {
    // offer to run it when the user does not have any scripts setup! 🤯
    possibleArgsArrs.push(["ng", "build", "--prod"]);
  }

  return {
    type: "@angular/cli",
    command: getYarnOrNPMCommand(),
    port: 8888,
    proxyPort: 4200,
    env: { ...process.env },
    possibleArgsArrs,
    urlRegexp: new RegExp(`(http://)([^:]+:)${4200}(/)?`, "g"),
    dist: "dist"
  };
};
```

It is pretty straightforward. We check for some required files, create a [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) reference to scripts and commands, add a script if one doesn't exist, and finally return an object with more information. Let's break this down a little more.

- `hasRequiredFiles` - This will help distinguish what kind of project it is. In the Angular example, we first check for a `package.json` so we can return immediately if it doesn't have one. Because it's _definitely_ not an Angular project without one. Then we make sure there's an `angular.json` file, practically every Angular project will have this workspace configuration file.

- `hasRequiredDeps` - This is another way to make sure the project is using a certain type of software. For instance, all Angular projects will use the [Angular CLI](https://cli.angular.io/) (`@angular/cli`) to run the build commands.

- `possibleArgsArr.push` - Lets you add a script that can be run if there are no scripts already setup. Here, I put the most common Angular build command, `ng build --prod`.

At the end of this file we return an object with these properties:

```js
{
    type: String, // e.g. gatsby, vue-cli
    command: String, // e.g. yarn, npm
    port: Number, // e.g. 8888
    proxyPort: Number, // e.g. 3000
    env: Object, // env variables, see examples
    possibleArgsArrs: [[String]], // e.g [['run develop]], so that the combined command is 'npm run develop', but we allow for multiple
    urlRegexp: RegExp, // see examples
    dist: String, // static folder where a _redirect file would be placed, e.g. 'public' or 'static'. NOT the build output folder
}
```

There are more notes in the [detectors README.md](https://github.com/netlify/cli/blob/master/src/detectors/README.md), if you want a little more information. Now you have all the intel to build your own detector!

## Contributing to the Netlify CLI

You have a detector file now, because you're amazing, and want to add it to the CLI for others to benefit because, again, you're amazing. The CLI project has a [`CONTRIBUTING.md`](https://github.com/netlify/cli/blob/master/CONTRIBUTING.md) file for full details but I'll break down the steps here.

1. Fork the Netlify CLI repo

   ![screenshot of where to fork the repo](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1582143622/Screen_Shot_2020-02-19_at_3.04.46_PM_1_qt1w0m.jpg)

2. Clone the repo locally using your fork `git clone https://<your github username>/cli`, so mine would be

   ```bash
   git clone https://github.com/tzmanics/cli
   ```

3. Go into that directory and install the dependencies

   ```bash
   cd cli && npm i
   ```

4. Set the upstream to the Netlify version to keep it synced

   ```bash
   git remote add upstream https://github.com/netlify/cli
   ```

5. Create a branch to include your detector

   ```bash
   git checkout -b awesome-new-detector
   ```

6. Add your detector to [`src/detectors/`](https://github.com/netlify/cli/tree/master/src/detectors). Then change to a directory of a test project and run the [`netlify dev`](https://url.netlify.com/HJNxS2V4I) command using your new branch to make sure you didn't break the CLI 😉. The CLI project also runs a few tests of its own when you submit a PR.

   ```bash
   cd /Users/tzmanics/Documents/PON/CODE/NETLIFY/angular-test-project
   "/Users/tzmanics/Documents/PON/CODE/NETLIFY/cli/bin/run" dev
   ```

   _everything before `cli` should be your path to your cloned CLI version_

   ![a failed test output](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1582772200/Screen_Shot_2020-02-26_at_9.37.39_PM_kk47go.jpg)
   ![a failed test in the browser](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1582772268/Screen_Shot_2020-02-26_at_9.56.00_PM_jwb8mn.jpg)

   In this failed test you can see that it doesn't detect any specifications so it falls back to the static site default (which won't work for this site). Then it is also unable to determine the public folder. What we get is a 'forbidden' output in the browser.

   ![a successful test output](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1582772228/Screen_Shot_2020-02-26_at_9.45.18_PM_l0trih.jpg)
   ![the successful browser output](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1582772247/Screen_Shot_2020-02-26_at_9.51.53_PM_kxz55d.jpg)

   When the detector is successful, the output shows we're working with correct tools, in this case `@angular/cli` and the project is built successfully as well. In the browser, you can see that the test project I used (the default Angular skeleton app) is displayed correctly. This is right out the box without any Netlify configurations, woo hoo 👍!

7. Add your changes to your git staging area, commit, and push up your branch

   ```bash
   git add src/detectors/awesomeness.js
   git commit -m 'adds an awesome detector'
   git push origin awesome-new-detector
   ```

8. Go back to the [Netlify CLI Repo](https://github.com/netlify/cli) to check your code and start your pull request

   ![screenshot of the compare and pull request button](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1582165137/Screen_Shot_2020-02-19_at_9.08.20_PM_ueryva.jpg)

9. Create your pull request following the handy-dandy guide

   ![screenshot of the pull request form](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1582165256/Screen_Shot_2020-02-19_at_9.10.29_PM_thbmu5.jpg)

10. 🎊 celebrate your success 🎊

Okay, _technically_ it was less than 10 steps, BUT celebrations should always be part of the process.

## And done!

Thank you for coming on this fun journey with me. You can pretty much use this same process for contributing to all the open source parts of Netlify. Be sure to check the `CONTRIBUTING.md` docs though. I hope you find a detector of your own to add and can help make Netlify even more awesome for yourself and other Netlifriends. Happy coding!

## Resources for the Road 📚🚍

- [What's Angular in the JAMstack? It Sounds Delicious!](https://url.netlify.com/HJvt82NV8)
- [Get Started with the Netlify CLI](https://url.netlify.com/Sk2TUn4NU)
- [Netlify Dev — our entire platform, right on your laptop](https://url.netlify.com/H18b_nEN8)
