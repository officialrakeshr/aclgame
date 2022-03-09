import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { selectUser } from '../redux/login/login.selector';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return (this.store.select(selectUser) as Observable<User>).pipe(
      map((u) => u.token != ''),
      tap((o) => (!o ? window.location.assign('/') : null))
    );
  }
}
