// Interface for navigation links
export interface NavLink {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

// Interface for social media links
export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon?: string; // Placeholder for icon name/class
}

// Interface for brand information
export interface BrandInfo {
  name: string; // "Get the Gadgets"
  tagline: string; // Short neutral fashion brand line
}

// Interface for mobile menu state
export interface MobileMenuState {
  isOpen: boolean;
  activeBreakpoint: 'mobile' | 'desktop';
}

// Interface for breakpoint configuration
export interface BreakpointConfig {
  mobile: string; // Tailwind breakpoint for mobile (e.g., 'md')
  tablet: string; // Tailwind breakpoint for tablet (e.g., 'lg')
  desktop: string; // Tailwind breakpoint for desktop (e.g., 'xl')
}

// Interface for navbar component state
export interface NavbarState {
  mobileMenuOpen: boolean;
  currentRoute: string;
  isScrolled: boolean; // For potential sticky navbar effects
}

// Interface for footer component state
export interface FooterState {
  brandInfo: BrandInfo;
  navigationLinks: NavLink[];
  socialLinks: SocialLink[];
}