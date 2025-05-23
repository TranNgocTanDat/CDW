export default interface AuthenticationReuquest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  authenticated: boolean;
  token: string;
}

export interface VerifyUserRequest {
  email: string;
  verificationCode: string;
}