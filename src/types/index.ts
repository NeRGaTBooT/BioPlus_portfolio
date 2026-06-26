export type {
  SiteConfig,
  SiteOffice,
  SitePhone,
  SiteRequisites,
  SiteStat,
  NavLink,
} from './site';

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories: Subcategory[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  manufacturer?: string;
  inStock: boolean;
  formula?: string;
  description?: string;
  popular?: boolean;
}

export interface Partner {
  name: string;
  logo: string;
  url: string;
}

export interface Client {
  name: string;
  logo: string;
  url: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'management' | 'sales';
  photo: string;
}

export interface Catalog {
  id: string;
  brand: string;
  logo: string;
  file: string;
}

export interface CategoriesData {
  categories: Category[];
}
