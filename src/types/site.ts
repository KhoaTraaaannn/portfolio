export interface SiteConfig {
  name: string;
  firstName: string;
  lastName: string;

  title: string;
  description: string;

  url: string;
  ogImage: string;

  location: string;

  links: {
    github: string;
    linkedin: string;
    email: string;
  };
}