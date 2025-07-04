import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth-primary text-white">
      <div className="container-xl section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <MapPin className="h-8 w-8 text-earth-light" />
              </div>
              <span className="text-xl font-playfair font-bold">Wanderlust Chronicles</span>
            </div>
            <p className="text-body text-earth-light leading-relaxed">
              Discover the world through authentic stories, AI-powered insights, and personalized travel experiences that inspire your next adventure.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Youtube, href: '#', label: 'YouTube' }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 bg-white/10 rounded-lg text-earth-light hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="heading-sm mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Blog', href: '/blog' },
                { name: 'Itinerary Builder', href: '/itinerary' },
                { name: 'Destination Map', href: '/map' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-earth-light hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="heading-sm mb-6">Popular Destinations</h3>
            <ul className="space-y-3">
              {[
                'Morocco',
                'Japan',
                'Patagonia',
                'Iceland',
                'Greece',
                'New Zealand'
              ].map((destination) => (
                <li key={destination}>
                  <a
                    href="#"
                    className="text-earth-light hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="heading-sm mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Mail className="h-4 w-4 text-earth-light" />
                </div>
                <span className="text-earth-light">hello@wanderlustchronicles.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Phone className="h-4 w-4 text-earth-light" />
                </div>
                <span className="text-earth-light">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-earth-secondary mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-earth-light text-sm">
              <span>© {currentYear} Wanderlust Chronicles. Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current animate-pulse" />
              <span>for travelers worldwide.</span>
            </div>
            <div className="flex space-x-8">
              {[
                'Privacy Policy',
                'Terms of Service',
                'Cookie Policy'
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-earth-light hover:text-white text-sm transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;