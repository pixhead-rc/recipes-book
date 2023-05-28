import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ValueTypePipe } from './valueType.pipe';
import { AsFormArrayPipe } from './asFormArray.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [		
    ValueTypePipe,
    AsFormArrayPipe
   ],
  exports: [
    ValueTypePipe,
    AsFormArrayPipe
  ],
  providers: [

  ]
})
export class PipesModule {}
