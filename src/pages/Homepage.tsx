import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import FeaturedDestinations from '../components/FeaturedDestinations';
import BlogPreview from '../components/BlogPreview';
import NewsletterSignup from '../components/NewsletterSignup';

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroCarousel />
      <FeaturedDestinations />
      <BlogPreview />
      
      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
};

export default Homepage;