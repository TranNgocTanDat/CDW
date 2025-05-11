export  interface User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
}

// UserCreationRequest.ts
export  interface UserCreationRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
}

// UserResponse.ts
export  interface UserResponse {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
}

// UserUpdateRequest.ts
export  interface UserUpdateRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
}
