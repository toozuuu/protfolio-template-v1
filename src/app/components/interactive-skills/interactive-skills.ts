import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  color: string;
  description: string;
}

@Component({
  selector: 'app-interactive-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './interactive-skills.html',
  styleUrl: './interactive-skills.css'
})
export class InteractiveSkills implements OnInit, OnDestroy {
  selectedSkill: Skill | null = null;
  isAnimating = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translateService: TranslateService
  ) {}

  skills: Skill[] = [
    {
      name: 'Angular',
      level: 95,
      category: 'Frontend',
      icon: '🅰️',
      color: 'bg-red-500',
      description: 'Expert level Angular development with 5+ years experience'
    },
    {
      name: 'TypeScript',
      level: 90,
      category: 'Language',
      icon: '🔷',
      color: 'bg-blue-500',
      description: 'Advanced TypeScript with complex type systems'
    },
    {
      name: 'React',
      level: 85,
      category: 'Frontend',
      icon: '⚛️',
      color: 'bg-cyan-500',
      description: 'Proficient in React with hooks and modern patterns'
    },
    {
      name: 'Node.js',
      level: 88,
      category: 'Backend',
      icon: '🟢',
      color: 'bg-green-500',
      description: 'Server-side JavaScript with Express and APIs'
    },
    {
      name: 'AWS',
      level: 80,
      category: 'Cloud',
      icon: '☁️',
      color: 'bg-orange-500',
      description: 'Cloud architecture and deployment on AWS'
    },
    {
      name: 'Flutter',
      level: 75,
      category: 'Mobile',
      icon: '🦋',
      color: 'bg-indigo-500',
      description: 'Cross-platform mobile development'
    }
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAnimations();
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  private initializeAnimations(): void {
    // Add reveal animation to skill cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.skill-card').forEach((el) => {
      observer.observe(el);
    });
  }

  selectSkill(skill: Skill): void {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.selectedSkill = skill;
    
    // Add animation class
    const element = document.querySelector(`[data-skill="${skill.name}"]`);
    if (element) {
      element.classList.add('animate-scale-in');
    }
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  closeSkillDetails(): void {
    this.selectedSkill = null;
  }

  getSkillLevelClass(level: number): string {
    if (level >= 90) return 'text-green-500';
    if (level >= 80) return 'text-blue-500';
    if (level >= 70) return 'text-yellow-500';
    return 'text-gray-500';
  }

  getSkillLevelText(level: number): string {
    if (level >= 90) return this.translateService.instant('skills.levels.expert');
    if (level >= 80) return this.translateService.instant('skills.levels.advanced');
    if (level >= 70) return this.translateService.instant('skills.levels.intermediate');
    return this.translateService.instant('skills.levels.beginner');
  }
}
