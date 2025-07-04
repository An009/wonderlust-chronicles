import React from 'react';
import { MapPin, Star, Clock, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  rating: number;
  duration: string;
  description: string;
  highlights: string[];
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'Marrakech',
    country: 'Morocco',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    rating: 4.8,
    duration: '5-7 days',
    description: 'The Red City with its vibrant souks and stunning architecture',
    highlights: ['Jemaa el-Fnaa', 'Majorelle Garden', 'Bahia Palace']
  },
  {
    id: 2,
    name: 'Fes',
    country: 'Morocco',
    image: 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    rating: 4.7,
    duration: '3-4 days',
    description: 'Ancient medina and traditional craftsmanship',
    highlights: ['Fes el-Bali', 'Tanneries', 'Al-Qarawiyyin']
  },
  {
    id: 3,
    name: 'Chefchaouen',
    country: 'Morocco',
    image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    rating: 4.9,
    duration: '2-3 days',
    description: 'The Blue Pearl nestled in the Rif Mountains',
    highlights: ['Blue Streets', 'Ras El Maa', 'Spanish Mosque']
  },
  {
    id: 4,
    name: 'Sahara Desert',
    country: 'Morocco',
    image: 'https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    rating: 5.0,
    duration: '2-3 days',
    description: 'Endless dunes and starlit nights',
    highlights: ['Erg Chebbi', 'Camel Trekking', 'Desert Camps']
  },
  {
    id: 5,
    name: 'Casablanca',
    country: 'Morocco',
    image: 'https://images.pexels.com/photos/5591664/pexels-photo-5591664.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    rating: 4.5,
    duration: '2-3 days',
    description: 'Modern Morocco meets Atlantic coastline',
    highlights: ['Hassan II Mosque', 'Corniche', 'Art Deco']
  },
  {
    id: 6,
    name: 'Essaouira',
    country: 'Morocco',
    image: 'https://images.pexels.com/photos/5591665/pexels-photo-5591665.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    rating: 4.6,
    duration: '2-3 days',
    description: 'Coastal charm with Portuguese influence',
    highlights: ['Medina Walls', 'Port', 'Argan Cooperatives']
  }
];

const FeaturedDestinations: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="section-padding bg-white">
      <div className="container-xl">
        <div ref={ref} className={`text-center mb-16 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="heading-lg text-earth-primary mb-6">
            Featured Destinations
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto text-neutral-600">
            Discover handpicked destinations that offer unforgettable experiences and authentic cultural immersion
          </p>
        </div>

        <div className="grid-responsive">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className={`card-interactive group ${
                inView ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="image-hover w-full h-64"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 backdrop-blur-custom px-3 py-2 rounded-full shadow-custom">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-neutral-800">{destination.rating}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="card-content">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-earth-primary" />
                    <span className="text-body-sm text-neutral-600">{destination.country}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-neutral-400" />
                    <span className="text-body-sm text-neutral-600">{destination.duration}</span>
                  </div>
                </div>

                <h3 className="heading-sm text-earth-primary mb-3 group-hover:text-accent-primary transition-colors duration-300">
                  {destination.name}
                </h3>
                
                <p className="text-body text-neutral-600 mb-6 line-clamp-2">
                  {destination.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-700 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="badge-primary"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="btn-primary w-full group/btn">
                    <span>Explore Destination</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="btn-secondary text-lg px-8 py-4">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;