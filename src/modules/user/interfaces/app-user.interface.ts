export interface AppUser {
  id: string;
  name: string;
  password: string;
}

export interface DbUser {
  id?: any;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password: string;
}

export interface UserDocument extends Document, DbUser {
  comparePassword: (password: string) => Promise<boolean>;
  withoutSensitiveDetails: () => any;
}
