export interface Content {
  version: string;
  bio: string;
  logo: string;
  experiences: Experiences;
  technologies: { [key: string]: Technology };
}

export interface Experiences {
  firstSection: Section[];
  secondSection: Section[];
  thirdSection: Section[];
}

export interface Section {
  id: string;
  technologies: string[];
  logo: string;
  title: string;
  show: boolean;
  date: SectionDate;
  descriptions: string[];
  memory: Memory;
}

export interface SectionDate {
  from: string;
  to?: string;
}

export interface Memory {
  video?: string;
  image?: Image;
  links?: Link[];
}

export interface Image {
  name: string;
}

export interface Link {
  title: string;
  url: string;
}

export interface Technology {
  title: string;
  imageName: string;
}
