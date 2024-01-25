export interface UserDetail {
  company?: string;
  location?: string;
  blog: string;
  id: string;
  login: string;
  html_url: string;
  avatar_url?: string;
  followers?: number;
  following?: number;
  public_repo?: number;
  name?: string;
  email?: string
}

export interface RepoDetail {
  name: string,
  html_url: string,
  description?: string,
  language?: string,
  watchers?: number
}
