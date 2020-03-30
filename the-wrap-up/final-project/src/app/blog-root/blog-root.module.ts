import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRootRoutingModule } from './blog-root-routing.module';
import { BlogRootComponent } from './blog-root.component';


@NgModule({
  declarations: [BlogRootComponent],
  imports: [
    CommonModule,
    BlogRootRoutingModule
  ]
})
export class BlogRootModule { }
