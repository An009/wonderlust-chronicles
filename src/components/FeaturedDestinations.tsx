import React from 'react';
import { MapPin, Star, Clock } from 'lucide-react';
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-earth-primary mb-4">
            Featured Destinations
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Discover handpicked destinations that offer unforgettable experiences and authentic cultural immersion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className={`card overflow-hidden group cursor-pointer ${
                inView ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-earth-primary" />
                    <span className="text-sm text-neutral-600">{destination.country}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-neutral-400" />
                    <span className="text-sm text-neutral-600">{destination.duration}</span>
                  </div>
                </div>

                <h3 className="text-xl font-playfair font-semibold text-earth-primary mb-2">
                  {destination.name}
                </h3>
                
                <p className="text-neutral-600 mb-4 line-clamp-2">
                  {destination.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-neutral-700">Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-nature-primary/10 text-nature-primary px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 bg-earth-primary hover:bg-earth-secondary text-white py-2 px-4 rounded-lg transition-colors duration-300">
                  Explore Destination
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-primary">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;