import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ValueTypePipe } from './valueType.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ValueTypePipe
],
  exports: [
    ValueTypePipe
  ],
  providers: [

  ]
})
export class PipesModule {}
