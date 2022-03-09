import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { loginReducer } from './@core/redux/login/login.reducer';
import { CoreModule } from './@core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({ login: loginReducer }),
    CoreModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [SharedModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
