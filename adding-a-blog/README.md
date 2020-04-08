# Adding a Blog

from base project

ng generate @scullyio/init:blog

ng g @scullyio/init:post --name="First post" (x2++)

blog-routing.module.ts

```js
    path: "",
    loadChildren: () =>
      import("../blog-root/blog-root.module").then(m => m.BlogRootModule),
    pathMatch: "full"
  },
  ...
```

add blog routes

```html
<h1>The Latest Jamgular Posts</h1>
<div class="blog-posts">
  <ul>
    <li *ngFor="let post of posts$ | async">
      <a [routerLink]="post.route">{{ post.title }}</a>
    </li>
  </ul>
</div>
```

blog-root.component.ts

```js
import { Component, OnInit } from "@angular/core";
import { ScullyRoute, ScullyRoutesService } from "@scullyio/ng-lib";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
```

```js
export class BlogRootComponent implements OnInit {
  constructor(private scully: ScullyRoutesService) {}
  posts$: Observable<ScullyRoute[]>;
```

```js
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

blog-root.component.html

```html
<hr />
<a [routerLink]="post.route">
  <div class="post-card">
    <h2>
      {{ post.title }}
    </h2>
    <p>{{ post.date }} | {{ post.authors }}</p>
    <b> {{ post.description }}</b>
  </div>
</a>
```

blog-root.component.scss

```scss
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
