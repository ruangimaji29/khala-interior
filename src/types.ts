import type { LucideIcon } from 'lucide-react';

export type ViewState = 'home' | 'catalog' | 'portfolio' | 'checkout' | 'privacy' | 'terms' | 'gallery';

export interface NavItem {
  label: string;
  view: ViewState;
  sectionId?: string; // For scrolling within home
}

export interface ProductItem {
  id: string; // Changed from number to string for Supabase UUID
  title: string;
  price: number; // Changed to number for calculations
  displayPrice: string;
  image: string;
  category: string;
  description: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  location: string;
  image: string;
  year: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  icon: LucideIcon;
}

export interface ContactInfo {
  whatsapp: string;
  instagram: string;
  tiktok: string;
  address: string;
}