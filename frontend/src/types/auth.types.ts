export interface UserRole {
  id: number;
  name: string;
}

export interface UserPermissions {
  canEdit: boolean;
  canDelete: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  permissions: UserPermissions;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
}
