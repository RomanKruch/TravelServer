export class RegisterDto {
  userInfo: {
    name: string;
    email: string;
  };
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}
