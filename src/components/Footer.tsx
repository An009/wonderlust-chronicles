import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-earth-light" />
              <span className="text-xl font-playfair font-bold">Wanderlust Chronicles</span>
            </div>
            <p className="text-earth-light">
              Discover the world through authentic stories, AI-powered insights, and personalized travel experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-earth-light hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-earth-light hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-earth-light hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-earth-light hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-earth-light hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-earth-light hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/itinerary" className="text-earth-light hover:text-white transition-colors">
                  Itinerary Builder
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-earth-light hover:text-white transition-colors">
                  Destination Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-earth-light hover:text-white transition-colors">
                  Morocco
                </a>
              </li>
              <li>
                <a href="#" className="text-earth-light hover:text-white transition-colors">
                  Japan
                </a>
              </li>
              <li>
                <a href="#" className="text-earth-light hover:text-white transition-colors">
                  Patagonia
                </a>
              </li>
              <li>
                <a href="#" className="text-earth-light hover:text-white transition-colors">
                  Iceland
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-earth-light" />
                <span className="text-earth-light">hello@wanderlustchronicles.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-earth-light" />
                <span className="text-earth-light">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-earth-secondary mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-earth-light text-sm">
            © {currentYear} Wanderlust Chronicles. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-earth-light hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-earth-light hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-earth-light hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;