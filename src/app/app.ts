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

type ProjectItem = {
  title: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isLightThemePreview = false;
  readonly projects: ProjectItem[] = [
    { title: 'UX & UI Design' },
    { title: 'Hybrid app' },
    { title: 'Website' }
  ];

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
}
