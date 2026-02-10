import { Injectable } from '@angular/core';

export type UserRole = 'doctor' | 'patient';

export type Specialty =
  | 'Médecine générale'
  | 'Cardiologie'
  | 'Chirurgie'
  | 'Ophtalmologie'
  | 'ORL'
  | 'Dentaire'
  | '';

export interface ClientUser {
  role: UserRole;
  specialty: Specialty;

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

@Injectable({ providedIn: 'root' })
export class Auth {
  private usersKey = 'users';
  private tokenKey = 'token';
  private currentKey = 'currentUser';

getDoctorsBySpecialty(specialty: Specialty) {
  return this.getUsers().filter(u => u.role === 'doctor' && u.specialty === specialty);
}


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

  // ✅ Role
  getRole(): UserRole | null {
    const u = this.getCurrentUser();
    return u ? u.role : null;
  }

  // ✅ Update user (ex: specialty)
  updateCurrentUser(patch: Partial<ClientUser>) {
    const current = this.getCurrentUser();
    if (!current) return;

    const updated = { ...current, ...patch };

    // update currentUser
    localStorage.setItem(this.currentKey, JSON.stringify(updated));

    // update in users array
    const users = this.getUsers();
    const idx = users.findIndex(u => u.username === current.username);
    if (idx >= 0) {
      users[idx] = updated;
      this.saveUsers(users);
    }
  }
}
