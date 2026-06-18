export type ProjectStatus =
  | "not_started"
  | "planning"
  | "in_development"
  | "completed"
  | "refactoring";
export type ProjectType = "personal" | "professional";
export type ProjectActionType = "repository" | "website" | "other";

export interface ProjectAction {
  type: ProjectActionType;
  label: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  images: string[];
  description: string;
  status: ProjectStatus;
  type: ProjectType;
  stacks: string[];
  actions: ProjectAction[];
}
