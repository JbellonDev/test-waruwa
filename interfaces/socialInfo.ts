export interface SocialInfoIcons {
  id: number,
  urlToGo: string,
  name: string,
  imageUrl: string,
  className: string
}

export interface PageStatus {
  remissionNumber?: string;
  icon?: string;
  title?: string;
  description?: string;
  button?: string;
  goTo?: string;
  status: number;
}