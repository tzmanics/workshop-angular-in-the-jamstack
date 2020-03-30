import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  },
  {
    path: "about",
    loadChildren: () => import("./about/about.module").then(m => m.AboutModule)
  },
  {
    path: "contact",
    loadChildren: () =>
      import("./contact/contact.module").then(m => m.ContactModule)
  },
  {
    path: "shop",
    loadChildren: () => import("./shop/shop.module").then(m => m.ShopModule)
  },
  {
    path: "success",
    loadChildren: () =>
      import("./form-success/form-success.module").then(
        m => m.FormSuccessModule
      )
  },
  {
    path: "blog",
    loadChildren: () => import("./blog/blog.module").then(m => m.BlogModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
