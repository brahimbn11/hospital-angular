import { Injectable } from '@angular/core';

export interface ClientUser {
  fullName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other' | '';
  street: string;
  city: string;
  country: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private usersKey = 'users';
  private tokenKey = 'token';
  private currentKey = 'currentUser';

  private getUsers(): ClientUser[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }

  private saveUsers(users: ClientUser[]) {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  signup(user: ClientUser): { ok: boolean; message: string } {
    const users = this.getUsers();

    const exists = users.some(
      u => u.username === user.username || u.email === user.email
    );

    if (exists) {
      return { ok: false, message: 'Username or email already exists' };
    }

    users.push(user);
    this.saveUsers(users);

    return { ok: true, message: 'Account created successfully' };
  }

  login(username: string, password: string): { ok: boolean; message: string } {
    const users = this.getUsers();

    const found = users.find(
      u => u.username === username && u.password === password
    );

    if (!found) {
      return { ok: false, message: 'Invalid username or password' };
    }

    localStorage.setItem(this.tokenKey, 'logged_in');
    localStorage.setItem(this.currentKey, JSON.stringify(found));

    return { ok: true, message: 'Login successful' };
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.currentKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): ClientUser | null {
    return JSON.parse(localStorage.getItem(this.currentKey) || 'null');
  }
}
