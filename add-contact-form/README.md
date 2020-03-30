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

## Resources for the Road

Horay, you've done it! Now enjoy some lovely reading about these topics!

- [Forms and Functions](https://www.netlify.com/blog/2018/09/14/forms-and-functions/)
