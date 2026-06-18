export type ProjectStatus = 'not_started' | 'planning' | 'in_development' | 'completed' | 'refactoring';
export type ProjectType = 'personal' | 'professional';

export interface Project {
    id: string;
    name: string;
    images: string[]; // Galeria de imagens, a primeira é a principal
    description: string;
    repositoryLink?: string;
    projectLink?: string;
    status: ProjectStatus;
    type: ProjectType;
    stacks: string[];
}
