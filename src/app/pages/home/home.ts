import { Component } from '@angular/core';
import { Header } from "../../components/shared/header/header";
import { Footer } from "../../components/shared/footer/footer";
import { SocialButtons } from "../../components/social-buttons/social-buttons";
import { ProjectCard } from "../../components/project-card/project-card";

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
}

@Component({
  selector: 'app-home',
  imports: [Header, Footer, SocialButtons, ProjectCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  projects: Project[] = [
  {
    title: 'ngxsmk-otp-input',
    description:
      'A lightweight, standalone Angular 17+ OTP/PIN input component with SCSS theming, mobile-friendly autofill, masking, and full ReactiveForms support.',
    image: 'assets/kr.png',
    tags: ['Angular'],
    liveDemoUrl: 'https://stackblitz.com/edit/ngxsmk-otp-input-demo',
    githubUrl: 'https://github.com/toozuuu/ngxsmk-otp-input'
  },
  {
    title: 'ngxsmk-tel-input',
    description:
      'Angular 17+ international telephone input component with flag icons, SCSS theming, and built-in validation.',
    image: 'assets/kr.png',
    tags: ['Angular', 'Forms'],
    liveDemoUrl: 'https://stackblitz.com/edit/ngxsmk-tel-input-demo',
    githubUrl: 'https://github.com/toozuuu/ngxsmk-tel-input'
  }
];

}
