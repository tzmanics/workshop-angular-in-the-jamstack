import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormSuccessComponent } from './form-success.component';

const routes: Routes = [{ path: '', component: FormSuccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormSuccessRoutingModule { }
