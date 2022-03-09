import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/@shared/modules/primeng/primeng.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    PrimengModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent },
    ]),
  ],
})
export class LoginModule {}
