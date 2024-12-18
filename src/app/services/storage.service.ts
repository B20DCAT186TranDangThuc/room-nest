import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
const TOKEN = "token";
const USER = "user";
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken() {
    return window.localStorage.getItem(TOKEN);
  }

  static getUser() {
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserRole() {
    const user = this.getUser()
    if (user == null) return "";
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken == null) return false;
    const role: string = this.getUserRole();
    return role == "SUPER_ADMIN"
  }

  static isCustomerLoggedIn(): boolean {
    if (this.getToken == null) return false;
    const role: string = this.getUserRole();
    return role == "USER"
  }

  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

  static getUserId(): string {
    const user = this.getUser();
    if (user == null) { return '' };
    return user.id;
  }

  static getRoleFromToken(): string {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      // Giải mã token
      const decoded: any = jwtDecode(token);
      return decoded.role || null;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
}
