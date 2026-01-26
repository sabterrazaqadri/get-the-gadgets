import Link from 'next/link';
import { BrandInfo, NavLink, SocialLink } from '../../src/types/nav-types';
import { navigationLinks } from '../../src/constants/nav-links';

const brandInfo: BrandInfo = {
  name: "Get the Gadgets",
  tagline: "Contemporary fashion essentials"
};

const socialLinks: SocialLink[] = [
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100093186309474' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/getthegadgetss?igsh=YndhZ3BwZ3F3N3Rl' }
];

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Information Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">{brandInfo.name}</h3>
            <p className="text-gray-400">{brandInfo.tagline}</p>
          </div>

          {/* Navigation Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              {socialLinks.map((socialLink) => (
                <li key={socialLink.id}>
                  <a
                    href={socialLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {socialLink.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} {brandInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;