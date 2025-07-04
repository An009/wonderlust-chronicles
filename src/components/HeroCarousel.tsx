import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    title: 'Discover Morocco',
    subtitle: 'Ancient Cities & Desert Adventures',
    description: 'Journey through imperial cities, bustling souks, and endless Sahara dunes'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    title: 'Explore Japan',
    subtitle: 'Tradition Meets Innovation',
    description: 'Experience the perfect blend of ancient temples and modern marvels'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    title: 'Adventure in Patagonia',
    subtitle: 'Untamed Wilderness',
    description: 'Trek through pristine landscapes and witness nature at its most raw'
  }
];

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
          <div className="gradient-overlay" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div className="container-lg animate-fade-in">
              <h1 className="heading-xl mb-6 animate-slide-up">
                {slide.title}
              </h1>
              <h2 className="text-xl md:text-3xl font-opensans font-light mb-8 animate-slide-up" 
                  style={{ animationDelay: '0.2s' }}>
                {slide.subtitle}
              </h2>
              <p className="text-body-lg md:text-xl max-w-3xl mx-auto mb-12 animate-slide-up" 
                 style={{ animationDelay: '0.4s' }}>
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" 
                   style={{ animationDelay: '0.6s' }}>
                <button className="btn-primary text-lg px-8 py-4">
                  Start Your Journey
                </button>
                <button className="btn-secondary text-lg px-8 py-4">
                  Explore Destinations
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={prevSlide}
          className="ml-6 p-4 rounded-full backdrop-blur-custom hover:bg-white/30 text-white transition-all duration-300 hover:scale-110 shadow-custom"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={nextSlide}
          className="mr-6 p-4 rounded-full backdrop-blur-custom hover:bg-white/30 text-white transition-all duration-300 hover:scale-110 shadow-custom"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Play/Pause Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 rounded-full backdrop-blur-custom hover:bg-white/30 text-white transition-all duration-300 hover:scale-110 shadow-custom"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125 shadow-custom' 
                : 'bg-white/50 hover:bg-white/75 hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 text-white animate-bounce-slow">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;