export interface SitePhone {
  label: string;
  value: string;
}

export interface SiteOffice {
  id: string;
  name: string;
  address: string;
  city: string;
  phones: SitePhone[];
  schedule: string;
  mapEmbed: string;
}

export interface SiteRequisites {
  legalName: string;
  legalAddress: string;
  postalAddress: string;
  unp: string;
  iban: string;
  bank: string;
  bic: string;
}

export interface SiteStat {
  value: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
  megaMenu?: boolean;
  dropdown?: boolean;
}

export interface SiteConfig {
  name: string;
  logo: string;
  tagline: string;
  description: string;
  contacts: {
    email: string;
    mobile: string;
    mobileNote: string;
  };
  offices: SiteOffice[];
  requisites: SiteRequisites;
  stats: SiteStat[];
  navigation: {
    main: NavLink[];
    about: NavLink[];
    products: NavLink[];
  };
}
