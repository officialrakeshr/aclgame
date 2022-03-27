import { AppState } from './../../../../@core/redux/app.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CryptoJS from 'crypto-js';
import { addUser } from 'src/app/@core/redux/login/login.action';
import { selectUser } from 'src/app/@core/redux/login/login.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/@shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private now: string = new Date().toString();
  user$ = this.store.select(selectUser);
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(addUser({ payload: { username: '', token: '' } }))
    }, 0)
  }
  validateToken(user: string) {
    if (this.api.loginUser(user)) {
      this.store.dispatch(
        addUser({ payload: { username: user, token: btoa(this.now) } })
      );
      sessionStorage.clear();
      sessionStorage.setItem(
        btoa(btoa(btoa('1'))),
        CryptoJS.AES.encrypt(user.trim().toString(), this.now).toString()
      );
      this.router.navigate(['./home'])
    } else alert ("Invalid User")
  }
}
