export interface Profile {
  profileId: number;
  userId: number;
  skills?: string;
  experience?: Record<string, any>;
  offers?: Record<string, any>;
  searchingFor?: Record<string, any>;
  location?: Record<string, any>;
  interests?: Record<string, any>;
  roles?: Record<string, any>;
  profileVisibility: boolean;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
