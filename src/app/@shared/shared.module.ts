import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './modules/primeng/primeng.module';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [PrimengModule],
  providers:[ApiService]
})
export class SharedModule {}
