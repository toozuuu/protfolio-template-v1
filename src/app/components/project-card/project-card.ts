import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

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
  styleUrl: './project-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  @Input() projectDetails: Project[] = [];
}
