import { NgModule } from "@angular/core";
import {
  MatToolbarModule,
} from "@angular/material/toolbar";
import {
  MatButtonModule,
} from "@angular/material/button";
const MaterialComponents=[
  MatButtonModule,
  MatToolbarModule
]
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class AngularMaterialModule {}