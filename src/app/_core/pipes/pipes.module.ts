import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ValueTypePipe } from './valueType.pipe';
import { AsFormArrayPipe } from './asFormArray.pipe';
import { HoursTimePipe } from './hoursTime.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [			
    ValueTypePipe,
    AsFormArrayPipe,
    HoursTimePipe
   ],
  exports: [
    ValueTypePipe,
    AsFormArrayPipe,
    HoursTimePipe
  ],
  providers: [

  ]
})
export class PipesModule {}
