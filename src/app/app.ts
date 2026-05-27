import { Component } from '@angular/core';

type ToolItem = {
  icon: string;
  iconFailed?: boolean;
  iconGlow: string;
  iconSurface: string;
  name: string;
};

type ToolCategory = {
  items: ToolItem[];
  title: string;
};

type ProjectCard = {
  demoUrl?: string;
  description: string;
  image?: string;
};

type ProjectImageModal = {
  src: string;
  title: string;
};

type ProjectItem = {
  cards: ProjectCard[];
  title: string;
};

type WorkExperienceItem = {
  company: string;
  description: string;
  icon: string;
  role: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isContactModalOpen = false;
  isLightThemePreview = false;
  isProjectImageDragging = false;
  isSkillsModalOpen = false;
  projectImageZoom = 1;
  selectedProjectImage: ProjectImageModal | null = null;
  selectedProject: ProjectItem | null = null;
  private projectImageDragStart: { scrollLeft: number; scrollTop: number; x: number; y: number } | null = null;
  readonly projects: ProjectItem[] = [
    {
      cards: [
        {
          description: 'Website interface design for a library',
          image: '/Website%20interface%20design%20for%20a%20library.png'
        },
        {
          description: 'Interface design for a loyalty card storage app',
          image: '/card%20loyayti.png'
        },
        {
          description: 'Portfolio website interface design',
          image: '/portfolio.png'
        },
        {
          description: 'Website interface design for my site',
          image: '/mysite.png'
        },
        {
          description: 'Examples of interface designs for the JogiCards app',
          image: '/JogiCards.png'
        },
        {
          description: 'Website interface design for my portfolio',
          image: '/portfoliofigma.png'
        }
      ],
      title: 'UX & UI Design'
    },
    { cards: [], title: 'Hybrid app' },
    {
      cards: [
        {
          demoUrl: '/demos/portfolio-site/index.html',
          description: 'Website using Angular framework for JavaScript'
        },
        {
          demoUrl: '/demos/project-workshop/index.html',
          description: 'A site based on pure JavaScript without the use of components'
        }
      ],
      title: 'Website'
    }
  ];

  readonly workExperiences: WorkExperienceItem[] = [
    {
      company: 'UPWORK',
      description:
        'Performed tasks related to interface development, technical project support, website setup, error correction, and assisting clients in implementing technical solutions.',
      icon: '/Upwork.png',
      role: 'Frontend Developer | Technical Assistant'
    },
    {
      company: 'FIVERR',
      description:
        'Worked at Fiverr as a Frontend Developer and Digital Presence Specialist. Helped clients create and enhance their online presence through website development, visual optimization, profile customization, and overall brand visibility.',
      icon: '/Fiverr.png',
      role: 'Frontend Developer | Digital presence'
    }
  ];

  readonly expandedWorkExperiences = new Set<string>();

  readonly toolCategories: ToolCategory[] = [
    {
      title: 'AI & Design',
      items: [
        {
          icon: '/tool-icons/ChatGPT.png',
          iconGlow: 'rgba(116, 170, 156, 0.24)',
          iconSurface: 'rgba(116, 170, 156, 0.14)',
          name: 'Chat GPT'
        },
        {
          icon: '/tool-icons/Codex.png',
          iconGlow: 'rgba(116, 170, 156, 0.24)',
          iconSurface: 'rgba(116, 170, 156, 0.14)',
          name: 'Codex'
        },
        {
          icon: 'https://cdn.simpleicons.org/githubcopilot/FFFFFF',
          iconGlow: 'rgba(255, 255, 255, 0.18)',
          iconSurface: 'rgba(255, 255, 255, 0.08)',
          name: 'Copilot'
        },
        {
          icon: '/tool-icons/Gemini.png',
          iconGlow: 'rgba(142, 117, 178, 0.24)',
          iconSurface: 'rgba(142, 117, 178, 0.14)',
          name: 'Gemini'
        },
        {
          icon: 'https://cdn.simpleicons.org/figma/F24E1E',
          iconGlow: 'rgba(242, 78, 30, 0.24)',
          iconSurface: 'rgba(242, 78, 30, 0.14)',
          name: 'Figma'
        }
      ]
    },
    {
      title: 'Frontend & Web',
      items: [
        {
          icon: 'https://cdn.simpleicons.org/ionic/3880FF',
          iconGlow: 'rgba(56, 128, 255, 0.24)',
          iconSurface: 'rgba(56, 128, 255, 0.14)',
          name: 'Ionic'
        },
        {
          icon: 'https://cdn.simpleicons.org/angular/DD0031',
          iconGlow: 'rgba(221, 0, 49, 0.24)',
          iconSurface: 'rgba(221, 0, 49, 0.14)',
          name: 'Angular'
        },
        {
          icon: 'https://cdn.simpleicons.org/capacitor/119EFF',
          iconGlow: 'rgba(17, 158, 255, 0.24)',
          iconSurface: 'rgba(17, 158, 255, 0.14)',
          name: 'Capacitor'
        },
        {
          icon: 'https://cdn.simpleicons.org/docker/2496ED',
          iconGlow: 'rgba(36, 150, 237, 0.24)',
          iconSurface: 'rgba(36, 150, 237, 0.14)',
          name: 'Docker'
        },
        {
          icon: '/tool-icons/Android_Studio.png',
          iconGlow: 'rgba(61, 220, 132, 0.24)',
          iconSurface: 'rgba(61, 220, 132, 0.14)',
          name: 'Android Studio'
        }
      ]
    },
    {
      title: 'Workflow & Utilities',
      items: [
        {
          icon: 'https://cdn.simpleicons.org/diagramsdotnet/F08705',
          iconGlow: 'rgba(240, 135, 5, 0.24)',
          iconSurface: 'rgba(240, 135, 5, 0.14)',
          name: 'Draw.io'
        },
        {
          icon: 'https://cdn.simpleicons.org/git/F05032',
          iconGlow: 'rgba(240, 80, 50, 0.24)',
          iconSurface: 'rgba(240, 80, 50, 0.14)',
          name: 'Git'
        },
        {
          icon: 'https://cdn.simpleicons.org/jira/0052CC',
          iconGlow: 'rgba(0, 82, 204, 0.24)',
          iconSurface: 'rgba(0, 82, 204, 0.14)',
          name: 'Jira'
        },
        {
          icon: 'https://cdn.simpleicons.org/notion/FFFFFF',
          iconGlow: 'rgba(255, 255, 255, 0.16)',
          iconSurface: 'rgba(255, 255, 255, 0.08)',
          name: 'Notion'
        },
        {
          icon: 'https://cdn.simpleicons.org/postman/FF6C37',
          iconGlow: 'rgba(255, 108, 55, 0.24)',
          iconSurface: 'rgba(255, 108, 55, 0.14)',
          name: 'Postman'
        }
      ]
    },
    {
      title: 'Dev Environment',
      items: [
        {
          icon: '/tool-icons/Visual_Studio_Code.png',
          iconGlow: 'rgba(0, 122, 204, 0.24)',
          iconSurface: 'rgba(0, 122, 204, 0.14)',
          name: 'VS Code'
        },
        {
          icon: 'https://cdn.simpleicons.org/googlechrome/4285F4',
          iconGlow: 'rgba(66, 133, 244, 0.24)',
          iconSurface: 'rgba(66, 133, 244, 0.14)',
          name: 'Chrome DevTools'
        },
        {
          icon: 'https://cdn.simpleicons.org/npm/CB3837',
          iconGlow: 'rgba(203, 56, 55, 0.24)',
          iconSurface: 'rgba(203, 56, 55, 0.14)',
          name: 'NPM'
        },
        {
          icon: 'https://cdn.simpleicons.org/github/FFFFFF',
          iconGlow: 'rgba(255, 255, 255, 0.16)',
          iconSurface: 'rgba(255, 255, 255, 0.08)',
          name: 'GitHub'
        },
        {
          icon: '/tool-icons/IntelliJ_IDEA.png',
          iconGlow: 'rgba(253, 72, 133, 0.24)',
          iconSurface: 'rgba(96, 56, 255, 0.14)',
          name: 'Intellij IDEA'
        }
      ]
    }
  ];

  toggleThemePreview(): void {
    this.isLightThemePreview = !this.isLightThemePreview;
  }

  openSkillsModal(): void {
    this.isSkillsModalOpen = true;
    this.syncPageScrollLock();
  }

  closeSkillsModal(): void {
    this.isSkillsModalOpen = false;
    this.syncPageScrollLock();
  }

  openContactModal(): void {
    this.isContactModalOpen = true;
    this.syncPageScrollLock();
  }

  closeContactModal(): void {
    this.isContactModalOpen = false;
    this.syncPageScrollLock();
  }

  submitContactForm(event: SubmitEvent): void {
    event.preventDefault();
    this.closeContactModal();
  }

  openProjectModal(project: ProjectItem): void {
    this.selectedProject = project;
    this.syncPageScrollLock();
  }

  closeProjectModal(): void {
    this.selectedProject = null;
    this.syncPageScrollLock();
  }

  openProjectImage(card: ProjectCard): void {
    if (!card.image) {
      return;
    }

    this.projectImageZoom = 1;
    this.selectedProjectImage = {
      src: card.image,
      title: card.description
    };
    this.syncPageScrollLock();
  }

  openProjectCard(card: ProjectCard): void {
    if (card.demoUrl) {
      window.open(card.demoUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    this.openProjectImage(card);
  }

  closeProjectImage(): void {
    this.selectedProjectImage = null;
    this.projectImageZoom = 1;
    this.stopProjectImageDrag();
    this.syncPageScrollLock();
  }

  zoomProjectImage(delta: number): void {
    this.projectImageZoom = Math.min(3, Math.max(0.6, Number((this.projectImageZoom + delta).toFixed(2))));
  }

  resetProjectImageZoom(): void {
    this.projectImageZoom = 1;
  }

  getProjectImageZoomPercent(): number {
    return Math.round(this.projectImageZoom * 100);
  }

  onProjectImageWheel(event: WheelEvent): void {
    event.preventDefault();
    this.zoomProjectImage(event.deltaY < 0 ? 0.12 : -0.12);
  }

  startProjectImageDrag(event: MouseEvent, viewport: HTMLElement): void {
    if (event.button !== 0) {
      return;
    }

    this.isProjectImageDragging = true;
    this.projectImageDragStart = {
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
      x: event.clientX,
      y: event.clientY
    };
    event.preventDefault();
  }

  dragProjectImage(event: MouseEvent, viewport: HTMLElement): void {
    if (!this.projectImageDragStart) {
      return;
    }

    viewport.scrollLeft = this.projectImageDragStart.scrollLeft - (event.clientX - this.projectImageDragStart.x);
    viewport.scrollTop = this.projectImageDragStart.scrollTop - (event.clientY - this.projectImageDragStart.y);
    event.preventDefault();
  }

  stopProjectImageDrag(): void {
    this.isProjectImageDragging = false;
    this.projectImageDragStart = null;
  }

  isWorkExperienceExpanded(company: string): boolean {
    return this.expandedWorkExperiences.has(company);
  }

  toggleWorkExperience(company: string): void {
    if (this.expandedWorkExperiences.has(company)) {
      this.expandedWorkExperiences.delete(company);
      return;
    }

    this.expandedWorkExperiences.add(company);
  }

  private syncPageScrollLock(): void {
    const hasOpenModal = this.isSkillsModalOpen || this.isContactModalOpen || this.selectedProject !== null || this.selectedProjectImage !== null;

    document.documentElement.classList.toggle('modal-scroll-lock', hasOpenModal);
    document.body.classList.toggle('modal-scroll-lock', hasOpenModal);
  }
}
