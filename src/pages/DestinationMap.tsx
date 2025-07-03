import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, MarkerClusterGroup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Filter, Search, MapPin, Star, Camera } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Destination {
  id: number;
  name: string;
  country: string;
  coordinates: [number, number];
  category: string;
  rating: number;
  image: string;
  description: string;
  highlights: string[];
  visited: boolean;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'Marrakech',
    country: 'Morocco',
    coordinates: [31.6295, -7.9811],
    category: 'Culture',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    description: 'The Red City with vibrant souks and stunning architecture',
    highlights: ['Jemaa el-Fnaa', 'Majorelle Garden', 'Bahia Palace'],
    visited: true
  },
  {
    id: 2,
    name: 'Fes',
    country: 'Morocco',
    coordinates: [34.0181, -5.0078],
    category: 'Culture',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    description: 'Ancient medina and traditional craftsmanship',
    highlights: ['Fes el-Bali', 'Tanneries', 'Al-Qarawiyyin'],
    visited: true
  },
  {
    id: 3,
    name: 'Chefchaouen',
    country: 'Morocco',
    coordinates: [35.1711, -5.2636],
    category: 'Photography',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    description: 'The Blue Pearl nestled in the Rif Mountains',
    highlights: ['Blue Streets', 'Ras El Maa', 'Spanish Mosque'],
    visited: true
  },
  {
    id: 4,
    name: 'Sahara Desert',
    country: 'Morocco',
    coordinates: [31.0424, -4.0020],
    category: 'Adventure',
    rating: 5.0,
    image: 'https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    description: 'Endless dunes and starlit nights',
    highlights: ['Erg Chebbi', 'Camel Trekking', 'Desert Camps'],
    visited: true
  },
  {
    id: 5,
    name: 'Casablanca',
    country: 'Morocco',
    coordinates: [33.5731, -7.5898],
    category: 'Culture',
    rating: 4.5,
    image: 'https://images.pexels.com/photos/5591664/pexels-photo-5591664.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    description: 'Modern Morocco meets Atlantic coastline',
    highlights: ['Hassan II Mosque', 'Corniche', 'Art Deco'],
    visited: true
  },
  {
    id: 6,
    name: 'Tokyo',
    country: 'Japan',
    coordinates: [35.6762, 139.6503],
    category: 'Culture',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    description: 'Where tradition meets cutting-edge innovation',
    highlights: ['Senso-ji Temple', 'Shibuya Crossing', 'Tsukiji Market'],
    visited: false
  },
  {
    id: 7,
    name: 'Kyoto',
    country: 'Japan',
    coordinates: [35.0116, 135.7681],
    category: 'Culture',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    description: 'Ancient temples and traditional gardens',
    highlights: ['Fushimi Inari', 'Bamboo Grove', 'Golden Pavilion'],
    visited: false
  },
  {
    id: 8,
    name: 'Patagonia',
    country: 'Argentina/Chile',
    coordinates: [-50.9423, -73.4068],
    category: 'Adventure',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    description: 'Pristine wilderness and dramatic landscapes',
    highlights: ['Torres del Paine', 'Perito Moreno', 'Fitz Roy'],
    visited: false
  },
  {
    id: 9,
    name: 'Reykjavik',
    country: 'Iceland',
    coordinates: [64.1466, -21.9426],
    category: 'Nature',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    description: 'Gateway to Iceland\'s natural wonders',
    highlights: ['Northern Lights', 'Blue Lagoon', 'Golden Circle'],
    visited: false
  },
  {
    id: 10,
    name: 'Santorini',
    country: 'Greece',
    coordinates: [36.3932, 25.4615],
    category: 'Photography',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    description: 'Iconic white buildings and stunning sunsets',
    highlights: ['Oia Sunset', 'Red Beach', 'Akrotiri'],
    visited: false
  }
];

const categories = ['All', 'Culture', 'Adventure', 'Photography', 'Nature'];

const DestinationMap: React.FC = () => {
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showVisitedOnly, setShowVisitedOnly] = useState(false);

  useEffect(() => {
    let filtered = destinations;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(dest => dest.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showVisitedOnly) {
      filtered = filtered.filter(dest => dest.visited);
    }

    setFilteredDestinations(filtered);
  }, [selectedCategory, searchTerm, showVisitedOnly]);

  const createCustomIcon = (visited: boolean) => {
    return new Icon({
      iconUrl: visited 
        ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
        : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-16">
      {/* Header */}
      <div className="bg-earth-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
            Destination Map
          </h1>
          <p className="text-xl text-earth-light max-w-3xl mx-auto">
            Explore our featured destinations around the world
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-primary focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-primary focus:border-transparent appearance-none bg-white min-w-[150px]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Visited Filter */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showVisitedOnly}
                onChange={(e) => setShowVisitedOnly(e.target.checked)}
                className="w-4 h-4 text-earth-primary bg-neutral-100 border-neutral-300 rounded focus:ring-earth-primary focus:ring-2"
              />
              <span className="text-neutral-700 font-medium">Visited only</span>
            </label>
          </div>

          {/* Legend */}
          <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-neutral-200">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-neutral-600">Visited</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm text-neutral-600">Wishlist</span>
            </div>
            <div className="text-sm text-neutral-600">
              Showing {filteredDestinations.length} of {destinations.length} destinations
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div style={{ height: '600px' }}>
            <MapContainer
              center={[35, 0]}
              zoom={2}
              style={{ height: '100%', width: '100%' }}
              className="rounded-xl"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <MarkerClusterGroup>
                {filteredDestinations.map((destination) => (
                  <Marker
                    key={destination.id}
                    position={destination.coordinates}
                    icon={createCustomIcon(destination.visited)}
                  >
                    <Popup className="custom-popup">
                      <div className="w-64">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-playfair font-semibold text-lg text-earth-primary">
                              {destination.name}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{destination.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm text-neutral-600">
                            <MapPin className="h-4 w-4" />
                            <span>{destination.country}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              destination.category === 'Culture' ? 'bg-blue-100 text-blue-800' :
                              destination.category === 'Adventure' ? 'bg-green-100 text-green-800' :
                              destination.category === 'Photography' ? 'bg-purple-100 text-purple-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {destination.category}
                            </span>
                          </div>
                          
                          <p className="text-sm text-neutral-600">
                            {destination.description}
                          </p>
                          
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-neutral-700">Highlights:</h4>
                            <div className="flex flex-wrap gap-1">
                              {destination.highlights.map((highlight, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-earth-primary/10 text-earth-primary px-2 py-1 rounded-full"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <button className="w-full mt-3 bg-earth-primary hover:bg-earth-secondary text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        </div>

        {/* Destination Grid */}
        <div className="mt-12">
          <h2 className="text-2xl font-playfair font-bold text-earth-primary mb-6">
            Featured Destinations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination, index) => (
              <div
                key={destination.id}
                className="card overflow-hidden group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      destination.visited 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {destination.visited ? 'Visited' : 'Wishlist'}
                    </span>
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                      {destination.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-medium">{destination.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-playfair font-semibold text-earth-primary mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-2">{destination.country}</p>
                  <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                    {destination.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {destination.highlights.slice(0, 2).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-earth-primary/10 text-earth-primary px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                    {destination.highlights.length > 2 && (
                      <span className="text-xs text-neutral-500">
                        +{destination.highlights.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationMap;