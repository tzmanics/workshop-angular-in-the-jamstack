# Adding a Contact Form

In this section we'll be adding a contact form to our site. The setup is really easy because we'll be utilizing Netlify forms and won't even have to write any code beyond HTML and CSS. Although this process may not seem specifically related to a Jamstack best practice it highlights a core principle of delegating and decoupling. Let's discuss.

## Delegating, Decoupling and Dachshunds

Two core concepts in the Jamstack are delegating tasks like infrastructure setup to infrastructure providers (think serverless functions) and decoupling backend from frontend.What does this have to do with Dachshunds? These concepts focus on the the modern day strains of developers. When working on a project dealing with server setup, security concerns, site development, and more, we start to feel spread pretty thin. Pulling ourselves in so many directions until we resemble those adorably long and goofy dogs, the Dachshund. I know, I know, it's a stretch. 🥁😃

![dachshund jumping on a tablet gif](https://media0.giphy.com/media/3boPPdHk2ueo8/giphy.gif?cid=ecf05e477c393a15a5b93c35647561c669955482c7d03303&rid=giphy.gif)

### Safe and Secure

Not only does delegating processes free up development hours to focus on the product, it puts dedicated teams in charge of hard, ever-evolving tasks like security. There are definitely teams out there who are tasked to attack your site and that is all they have on their agenda. Can you imagine that daily stand up? "Well, today, like yesterday, I'm just going to try to ruin the internet," said Susan for the 985th day in a row. A few years ago there was an attack that cause 12 million Drupal sites to require emergency patching. We can only imagine the dev hours that went into that.

Security is actually enhanced in the Jamstack due to other best practices as well. Pre-rendering your application only gives users access to an HTML page that isn't linked to any access to configurations or susceptible to typical malware. The distributed nature of the Jamstack means that even if a CDN or third-party API falls victim to an attack, it's very likely that the underlying architecture is safe and your site is as well.

### Serverless Serving More

A great example of both delegating and decoupling is the use of serverless function in the Jamstack. The bases of serverless is handing over the reins, and stress, of server management to infrastructure providers. You are smart, I'm sure you're quite capable of server setup and maintenance. But why when you don't _have_ to.

![going to lose it office space gif](https://media3.giphy.com/media/lKXZAA106xwkg/giphy.gif?cid=ecf05e4717d74ab53328b945165e6f735f0a528f44a360ef&rid=giphy.gif)

Serverless functions also allow you to detach process and carry out tasks like checking for errors, querying databases, integrating with API, and SO much more. The reason we're able to just write HTML to include a functioning form in this section of the workshop is thanks to a Netlify Function. It's doing the work behind the scene for us.

### A Couple Notes on Decoupling

There are a few different ways that the Jamstack approach attempts to decouple and modularize apps and the development process. One is how the building out of the code is separated from what's actually being served. When you pre-render a site there are moving pieces at build time but then the user gets the benefit of a fast response time due to serving non-moving, static content.

Another approach is the decoupling of backend and frontend teams. We do this at Netlify, as to say, the decoupling can happen _in_ the company. Having this type of separation of concerns makes responsibilities clearer. It also makes developers inboxes clearer because we won't have to subscribe to the 87,000 newsletters for _both_ front and backend development 😅.

## Form to Inform

Thinking of how serverless functions can decouple and delegate tasks lets look at how we create a contact form using Netlify forms running on Netlify Functions.

# Time to Code

In this exercise we're going to add a contact form to our website. We're going to delegate all the work to Netlify by using Netlify Forms. This was we only have to edit the HTML and CSS. Here's the steps we'll take:

- add the form to the `contact` component & style
- create a custom 'Success' page
- deploy the site & test the form
- check out the information in the form dashboard

Let's get into form-ation!

## Getting Setup

To get started you can either clone this whole workshop and start with the base project in this directory or you can clone the final version of the base project.

```bash
git clone https://github.com/tzmanics/workshop-angular-in-the-jamstack

...

git clone https://github.com/tzmanics/base-project_final
```

If you've been following along from the base project section, you can also simply build off of that project. This is a good jumpoff point for us because it's a site that navigation, routing, has Scully added for pre-rendering, and the Netlify configurations.

With the cloned projects you'll want to run `npm i`, set the remotes to your own git repos, and push an initial commit. You can follow along with how to do that [here, in any earlier section](https://github.com/tzmanics/workshop-angular-in-the-jamstack/tree/master/_step-1_base-project#git-going). You'll also want to get Scully added by following [this section of the past exercise](https://github.com/tzmanics/workshop-angular-in-the-jamstack/tree/master/prerendered-home-page#introducing-scully).

## Creating a Form

To create a Netlify Form we actually start off with a pretty standard form. My favorite part is that we don't even have to make any JavaScript to handle submissions. Netlify will recognize our form and use serverless functions to grab the information and feed it to the dashboard and wherever else we decide we would like it to go. This is one of the strategies that we covered before that help make a seemingly static site dynamic.

### The Basic Form

To start we'll add a `div`, `contact`, to contain the form, an `h2` header, and another `div`, `form-box`, to hold the form.

```html
<div class="contact">
  <h2>We can't wait to hear from you!</h2>
  <div class="form-box"></div>
</div>
```

Inside our form we'll set the a few things:

- `name` set to contact-form
- `class` set to contact-form as well
- `method` will be set to POST in order to work correctly with Netlify Forms

After this opening form tag, we'll create a two `input`s and a `textarea` to collect, name, email, and a message. For each of the inputs we'll set its `type`, `name`, and `class`. We'll also set the email input to `required`. We'll also add a label on the outside of each of these fields. I know that some people just put placeholder text inside the field, but that gets wiped out on cursor focus and I can never remember what I'm supposed to put there 🤔. Too much unnecessary cognitive energy. Anyhoo, let's take a look at the code:

```html
<form name="contact-form" class="contact-form" method="POST">
  <label> name: </label>
  <input type="text" name="name" class="input" />
  <label> email: </label>
  <input type="email" name="email" class="input" required />
  <label> message: </label>
  <textarea name="message" class="textarea" placeholder="message"> </textarea>
  <button type="submit">Submit</button>
</form>
```

The last thing we added here is a button of `type` submit so it knows that's the action we would like to happen.

### Adding the Netlify Magic

Now comes the fun part. There are two things we need to add to this form in order for Netlify to recognize it.

- `data-netlify="true"`: which is what Netlify looks for to take action on the form
- `<input type="hidden" name="form-name" value="contact-form" />`: this field needs to exist so that Netlify recognizes the form, !important the `value` field must match the `name` of the form.

> ❌ error tip: If you can see the form being recognized in the Netlify Forms dashboard but no submissions are being submitted/showing up, check this property first to make sure the value matches.

```html
<form
  name="contact-form"
  class="contact-form"
  method="POST"
  data-netlify="true"
></form>
```

### Styles Upon Styles Upon Styles

There's not much to say about the styling. Although I would like to point out that CSS is hard, it is not a strong skill of mine, and I am in total awe of it. All that to say, if you have an idea about how to make it better or more concise, please submit a pull request! That would be super lovely!

I digress. Here is the styling for the form:

```css
.contact {
  min-width: 722px;
  overflow: auto;

  h2 {
    text-align: center;
    font-weight: 200;
  }
}

.form-box {
  background-color: rgba(255, 255, 255, 0.5);
  margin: 100px auto;
  max-width: 600px;
  padding: 0;
  position: relative;
  width: 60%;
}

form {
  padding: 10px;
  button,
  input,
  textarea {
    display: block;
    font-size: 15px;
    line-height: 25px;
    padding: 5px;
    margin: 10px;
  }
}

textarea {
  height: 200px;
  margin: 10px;
  padding: 5px;
  width: 90%;
}
```

This is where I would push a commit of the changes. You can always have `ng serve` running in the background to keep an eye on the prize, I mean our awesome site.

### Smells Like Success

This next step isn't necessary but is a nice feature to add, imho. If we add an attribute to called `action` we can set it to a route and on a successful submission it will route the user to that page. In here we'll have it go to `/success`.

```html
<form
  name="contact-form"
  class="contact-form"
  method="POST"
  data-netlify="true"
  action="/success"
></form>
```

Now let's make success! We'll generate a module to create a super simple success page. Netlify does give a default success page but I like the personalization of a success page that keeps on brand with the rest of the site. We'll run this code to create that page and make two simple edit.

```bash
ng g m form-success --route success --module app.module
```

The two simple edits will be adding a message to the template:

`src/app/form-success.component.html`

```html
<h1>Submission successful</h1>
<h2>THANK YOU!</h2>
```

& a teeny bit of styling to the:

`src/app/form-success.component.scss`

```css
h1,
h2 {
  font-weight: 200;
  text-align: center;
}
```

Although we can't see the form actions via `ng serve` we can look to make sure the pages are styling correctly and have the information we want. We can just head over to [localhost:4200/contact](http://localhost:4200/contact) and [localhost:4200/success](http://localhost:4200/success) to see that the content and styling looks ok.

![screenshot of of the form](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1585587663/Screen_Shot_2020-03-30_at_12.58.59_PM_dhwmvk.jpg)
![screenshot of the success page](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1585587665/Screen_Shot_2020-03-30_at_1.00.26_PM_z5wqm5.jpg)

## Deploying & Testing

### Let's Go Live

Now we can get this site live and watch the form in action. Add, commit, and push your code to trigger a build. It may take a few minutes for the site to go live but you can watch the build process by using the command `netlify open` to go to the deploy dashboard.

```bash
git add .
git commit -m 'adds form'
git push

netlify open
```

![a gif of the form in action](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1585589460/form_trytwu.gif)

### Dash to the Dashboard

If we go to our project dashboard at https://app.netlify.com/sites/<site name> we can see in the top navigation a place to look at our forms. If everything worked correctly we'll see the form we just made listed in 'Active forms' and when we click it we'll see the test submissions we just made.

![screenshot of forms dashboard](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1585589867/Screen_Shot_2020-03-30_at_1.35.52_PM_2_hoxmif.jpg)

![screenshot of form submissions](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1585589727/Screen_Shot_2020-03-30_at_1.34.50_PM_dtlnct.jpg)

There are more options you can set like setting the outgoing notifications, downloading a csv of the submission and more.

> ❌ error tip: If you aren't seeing your submissions you may wan to try clicking the 'Verified submissions' drop down and looking at the 'Spam submissions'. All forms are filtered for spam using Aksimet so if you're hitting he form a lot from the same ISP it might think it's spam.

## Well, Good Form

We now have a form that's utilizing serverless functions to process and gather the information. Did you notice the word 'form' is in information?

> Inform itself comes (via French informer) from the Latin verb informare, which means to give form, or to form an idea of. (thanks [wikipedia](https://en.wikipedia.org/wiki/Information))

So I hope you have formed some great ideas about forms you can make in the future to gather information to inform fellow devs and friends.

## Resources for the Road Hooray, you've done it!

Now enjoy some lovely reading about these topics!

- [Forms and Functions](https://www.netlify.com/blog/2018/09/14/forms-and-functions/)
