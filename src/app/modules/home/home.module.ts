import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { StatComponent } from './pages/stat/stat.component';
import { PrimengModule } from 'src/app/@shared/modules/primeng/primeng.module';
import { CoreModule } from 'src/app/@core/core.module';
import { CountDownComponent } from './components/count-down/count-down.component';

@NgModule({
  declarations: [DashboardComponent, StatComponent, CountDownComponent],
  imports: [
    CommonModule,
    PrimengModule,
    CoreModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
  ],
})
export class HomeModule {}
