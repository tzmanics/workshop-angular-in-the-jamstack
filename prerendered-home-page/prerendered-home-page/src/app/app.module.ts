import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [BrowserModule, AppRoutingModule, ScullyLibModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
