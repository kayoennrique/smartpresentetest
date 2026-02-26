export type FaqItem = {
  title: string;
  content: string;
};

export interface CtaHeroFaqProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface SectionFaqProps {
  searchTerm: string;
}
