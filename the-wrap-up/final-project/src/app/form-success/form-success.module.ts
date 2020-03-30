import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormSuccessRoutingModule } from './form-success-routing.module';
import { FormSuccessComponent } from './form-success.component';


@NgModule({
  declarations: [FormSuccessComponent],
  imports: [
    CommonModule,
    FormSuccessRoutingModule
  ]
})
export class FormSuccessModule { }
