import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Search, Filter } from 'lucide-react';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: number;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'ultimate-morocco-guide',
    title: 'The Ultimate Guide to Morocco: From Imperial Cities to Desert Adventures',
    excerpt: 'Discover the magic of Morocco through our comprehensive guide covering everything from bustling medinas to serene desert landscapes. Learn about the best times to visit, cultural etiquette, and hidden gems.',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: 12,
    category: 'Destination Guide'
  },
  {
    id: 2,
    slug: 'marrakech-food-scene',
    title: 'Marrakech Food Scene: A Culinary Journey Through the Red City',
    excerpt: 'Explore the vibrant flavors of Marrakech, from street food in Jemaa el-Fnaa to fine dining in luxury riads. Discover traditional tagines, fresh mint tea, and modern Moroccan cuisine.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author: 'Ahmed Hassan',
    date: '2024-01-10',
    readTime: 8,
    category: 'Food & Culture'
  },
  {
    id: 3,
    slug: 'sahara-desert-experience',
    title: 'Sleeping Under the Stars: A Sahara Desert Experience',
    excerpt: 'Journey into the heart of the Sahara for an unforgettable night under the infinite desert sky. Learn about camel trekking, desert camps, and the magic of sunrise over the dunes.',
    image: 'https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author: 'Maria Rodriguez',
    date: '2024-01-05',
    readTime: 10,
    category: 'Adventure'
  },
  {
    id: 4,
    slug: 'chefchaouen-blue-pearl',
    title: 'Chefchaouen: Discovering Morocco\'s Blue Pearl',
    excerpt: 'Wander through the enchanting blue streets of Chefchaouen and uncover the stories behind this magical mountain town. Perfect for photography and peaceful exploration.',
    image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author: 'David Chen',
    date: '2024-01-01',
    readTime: 7,
    category: 'Photography'
  },
  {
    id: 5,
    slug: 'fes-artisan-workshops',
    title: 'Traditional Crafts in Fes: Behind the Scenes of Ancient Artisanship',
    excerpt: 'Step into the workshops of Fes to witness centuries-old crafts being practiced by master artisans. From leather tanning to pottery, discover Morocco\'s rich craft heritage.',
    image: 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author: 'Fatima Al-Zahra',
    date: '2023-12-28',
    readTime: 9,
    category: 'Culture'
  }
];

const categories = ['All', 'Destination Guide', 'Food & Culture', 'Adventure', 'Photography', 'Culture'];

const BlogList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-16">
      {/* Header */}
      <div className="bg-earth-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
            Travel Stories & Guides
          </h1>
          <p className="text-xl text-earth-light max-w-3xl mx-auto">
            Discover the world through authentic stories, practical guides, and insider tips from fellow travelers
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-primary focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-primary focus:border-transparent appearance-none bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-neutral-600">
            Showing {filteredPosts.length} of {blogPosts.length} articles
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="card overflow-hidden group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-accent-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-neutral-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-playfair font-semibold text-earth-primary mb-3 line-clamp-2 group-hover:text-accent-primary transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-neutral-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-neutral-400" />
                    <span className="text-sm text-neutral-600">{post.author}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-lg">No articles found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4 btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;