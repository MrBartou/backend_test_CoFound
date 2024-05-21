export interface User {
  userId: number;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
  profileId?: number;
}
