export interface User {
  id: number;
  name: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
  permissions: {
    canEdit: boolean;
    canDelete: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: number;
}

export interface UpdateUserData {
  name: string;
  email: string;
  password?: string;
  role: number;
}

export interface PaginatedUsers {
  data: User[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
