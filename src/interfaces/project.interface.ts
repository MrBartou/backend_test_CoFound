export interface Project {
  projectId: number;
  ownerId: number;
  title: string;
  description?: string;
  status?: string;
  participants?: Record<string, any>;
  categories?: Record<string, any>;
  requiredSkills?: Record<string, any>;
  budget?: Record<string, any>;
  timeline?: Record<string, any>;
  projectVisibility: boolean;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
