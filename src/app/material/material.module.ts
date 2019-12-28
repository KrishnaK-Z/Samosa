import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
 } from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
