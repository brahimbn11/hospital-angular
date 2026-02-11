import { Injectable } from '@angular/core';

export type UserRole = 'doctor' | 'patient' | 'admin';

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

  fullName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other' | '';
  street: string;
  city: string;
  country: string;

  username: string;
  password: string;

  specialty?: Specialty; // seulement doctor
  blocked?: boolean;     // admin peut bloquer
}

@Injectable({ providedIn: 'root' })
export class Auth {
  private usersKey = 'users';
  private tokenKey = 'token';
  private currentKey = 'currentUser';

  constructor() {
    this.ensureDefaultAdmin();
    this.ensureSessionConsistency();
  }

  // ----------------------------
  // Helpers storage
  // ----------------------------
  private getUsers(): ClientUser[] {
    const raw = localStorage.getItem(this.usersKey);
    const users: ClientUser[] = raw ? JSON.parse(raw) : [];
    // normalisation : blocked existe
    return users.map(u => ({ blocked: false, ...u }));
  }

  private saveUsers(users: ClientUser[]) {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  private ensureSessionConsistency() {
    const token = localStorage.getItem(this.tokenKey);
    const currentRaw = localStorage.getItem(this.currentKey);

    // si token sans currentUser, on nettoie
    if (token && !currentRaw) {
      localStorage.removeItem(this.tokenKey);
      return;
    }

    if (!token && currentRaw) {
      // si currentUser sans token, on nettoie
      localStorage.removeItem(this.currentKey);
    }

    // si user connecté est bloqué -> logout
    const cur = this.getCurrentUser();
    if (cur?.blocked) this.logout();
  }

  // ----------------------------
  // Auth
  // ----------------------------
  signup(user: ClientUser): { ok: boolean; message: string } {
    const users = this.getUsers();

    const exists = users.some(
      u => u.username === user.username || u.email === user.email
    );
    if (exists) return { ok: false, message: "Nom d'utilisateur ou email déjà utilisé." };

    const safeUser: ClientUser = {
      blocked: false,
      ...user,
    };

    users.push(safeUser);
    this.saveUsers(users);

    return { ok: true, message: 'Compte créé avec succès.' };
  }

  login(username: string, password: string): { ok: boolean; message: string } {
    const users = this.getUsers();

    const found = users.find(u => u.username === username && u.password === password);

    if (!found) return { ok: false, message: "Nom d'utilisateur ou mot de passe invalide." };

    if (found.blocked) {
      return { ok: false, message: "Votre compte est bloqué. Contactez l'administration." };
    }

    localStorage.setItem(this.tokenKey, 'logged_in');
    localStorage.setItem(this.currentKey, JSON.stringify(found));
    return { ok: true, message: 'Connexion réussie.' };
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.currentKey);
  }

  isLoggedIn(): boolean {
    // IMPORTANT : token + currentUser obligatoire
    const token = localStorage.getItem(this.tokenKey);
    const cur = localStorage.getItem(this.currentKey);
    if (!token || !cur) return false;

    // si le currentUser est bloqué -> logout
    const u = this.getCurrentUser();
    if (u?.blocked) {
      this.logout();
      return false;
    }

    return true;
  }

  getCurrentUser(): ClientUser | null {
    const raw = localStorage.getItem(this.currentKey);
    if (!raw) return null;

    try {
      const u = JSON.parse(raw) as ClientUser;
      return { blocked: false, ...u };
    } catch {
      return null;
    }
  }

  getRole(): UserRole | null {
    const u = this.getCurrentUser();
    return u ? u.role : null;
  }

  // ----------------------------
  // Doctors / Patients
  // ----------------------------
  getDoctorsBySpecialty(specialty: Specialty): ClientUser[] {
    return this.getUsers().filter(u => u.role === 'doctor' && u.specialty === specialty && !u.blocked);
  }

  getDoctors(): ClientUser[] {
    return this.getUsers().filter(u => u.role === 'doctor');
  }

  getPatients(): ClientUser[] {
    return this.getUsers().filter(u => u.role === 'patient');
  }

  getAllUsers(): ClientUser[] {
    return this.getUsers();
  }

  getUserByUsername(username: string): ClientUser | undefined {
    return this.getUsers().find(u => u.username === username);
  }

  setBlocked(username: string, blocked: boolean) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.username === username);
    if (idx === -1) return;

    users[idx] = { ...users[idx], blocked };
    this.saveUsers(users);

    const current = this.getCurrentUser();
    if (current?.username === username) {
      const updated = { ...current, blocked };
      localStorage.setItem(this.currentKey, JSON.stringify(updated));
      if (blocked) this.logout();
    }
  }

  updateCurrentUser(patch: Partial<ClientUser>) {
    const current = this.getCurrentUser();
    if (!current) return;

    const updated: ClientUser = { ...current, ...patch };

    localStorage.setItem(this.currentKey, JSON.stringify(updated));

    const users = this.getUsers();
    const idx = users.findIndex(u => u.username === current.username);
    if (idx >= 0) {
      users[idx] = updated;
      this.saveUsers(users);
    }
  }

  // ----------------------------
  // Default admin
  // ----------------------------
  private ensureDefaultAdmin() {
    const users = this.getUsers();

    // si admin existe déjà, on ne recrée pas
    const admin = users.find(u => u.role === 'admin' && u.username === 'admin');

    if (admin) {
      // optionnel : garantir non bloqué
      if (admin.blocked) {
        admin.blocked = false;
        this.saveUsers(users.map(u => (u.username === 'admin' ? admin : u)));
      }
      return;
    }

    const newAdmin: ClientUser = {
      role: 'admin',
      fullName: 'Administrateur Principal',
      email: 'admin@hospital.com',
      phone: '0600000000',
      gender: 'other',
      street: 'Administration centrale',
      city: 'Rabat',
      country: 'Maroc',
      username: 'admin',
      password: 'admin123',
      blocked: false,
    };

    users.push(newAdmin);
    this.saveUsers(users);
    console.log('✅ Admin par défaut créé : admin / admin123');
  }
}
