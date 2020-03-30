import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
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
    path: "about",
    loadChildren: () => import("./about/about.module").then(m => m.AboutModule)
  },
  {
    path: "",
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
