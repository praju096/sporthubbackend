// types/index.d.ts
export interface User {
  id: number;
  fullname: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}

export interface RegisterRequestBody {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}
