import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './@core/redux/app.state';
import { selectUser } from './@core/redux/login/login.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'acl-game';
  user$ = this.store.select(selectUser);
  constructor(private store: Store<AppState>) {}
}
