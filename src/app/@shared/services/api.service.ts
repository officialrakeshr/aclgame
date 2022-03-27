import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  loginUser(userCode: string): boolean {
    if (userCode === 'qwerty') {
      return true
    } else return false;
  }
}
