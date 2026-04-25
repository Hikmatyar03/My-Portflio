export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface StrategyItem {
  _key: string;
  number: string;
  title: string;
  description: string;
}

export interface SanityProject {
  _id: string;
  _type: "caseStudy";
  title: string;
  slug: { current: string };
  category: "Branding" | "Identity" | "Strategy" | "Campaign";
  year: number;
  coverImage: SanityImage;
  thumbnailImage?: SanityImage;
  excerpt: string;
  client: string;
  industry: string;
  scope: string[];
  problemStatement: string;
  problemBody?: unknown; // Portable Text blocks
  strategyItems?: StrategyItem[];
  identityImages?: SanityImage[];
  applicationImages?: SanityImage[];
  results: string[];
  featured: boolean;
  featuredOrder?: number;
  order: number;
}

export type SanityProjectCard = Pick<
  SanityProject,
  | "_id"
  | "title"
  | "slug"
  | "category"
  | "year"
  | "thumbnailImage"
  | "excerpt"
  | "featured"
  | "featuredOrder"
  | "order"
>;
