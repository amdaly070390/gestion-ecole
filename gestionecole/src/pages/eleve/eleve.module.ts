import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElevePage } from './eleve';

@NgModule({
  declarations: [
    ElevePage,
  ],
  imports: [
    IonicPageModule.forChild(ElevePage),
  ],
})
export class ElevePageModule {}
