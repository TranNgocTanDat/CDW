export default interface AuthenticationReuquest {
  username: string;
  password: string;
}

export interface AuthenticationResponse {
  authenticated: boolean;
  token: string;
}
