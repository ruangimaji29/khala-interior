import {
  Home,
  Armchair,
  PenTool,
  Info,
  Wrench,
  ClipboardList,
  MapPin,
  Phone,
  Globe
} from 'lucide-react';
import type { ContactInfo, ProductItem, ServiceItem, PortfolioItem } from './types';

export const CONTACT_DETAILS: ContactInfo = {
  whatsapp: "08111887145",
  instagram: "Khala Interior",
  tiktok: "Khala Interior",
  address: "Jl. Putri tunggal no. 54, RT 09 RW 03, Harjamukti, Cimanggis, Depok 16454"
};


export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: "The Glass House Residence",
    location: "Jakarta, Indonesia",
    year: "2023",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920"
  },
  {
    id: 2,
    title: "Skyline Penthouse",
    location: "Singapore",
    year: "2022",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1920"
  },
  {
    id: 3,
    title: "Zenith Workspace",
    location: "Bali, Indonesia",
    year: "2023",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920"
  },
  {
    id: 4,
    title: "Azure Villa",
    location: "Lombok, Indonesia",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1920"
  },
  {
    id: 5,
    title: "Monochrome Loft",
    location: "New York, USA",
    year: "2021",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1920"
  }
];

export const SERVICES: ServiceItem[] = [
  { id: 1, title: "Home Design", icon: Home },
  { id: 2, title: "Furniture Design", icon: Armchair },
  { id: 3, title: "Architecture", icon: PenTool },
  { id: 4, title: "Information Product", icon: Info },
  { id: 5, title: "Maintenance", icon: Wrench },
  { id: 6, title: "Administration", icon: ClipboardList },
  { id: 7, title: "Location Store", icon: MapPin },
  { id: 8, title: "Customer Services", icon: Phone },
  { id: 9, title: "Blog", icon: Globe },
];

export const HERO_IMAGE = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1920";
export const ABOUT_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920";