import { Component, Input } from '@angular/core';

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
}

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  @Input() projectDetails:Project[] = []; 
}
