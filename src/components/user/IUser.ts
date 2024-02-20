export interface IUser {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  confirmed: boolean;
  provider?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
