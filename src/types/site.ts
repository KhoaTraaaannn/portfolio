export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;

  links: {
    github: string;
    linkedin: string;
    email: string;
  };
}