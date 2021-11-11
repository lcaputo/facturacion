
export interface User {
  email: string;
  password: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}


export interface UserProfile {
  name: string;
  email: string;
  password: string;
}
