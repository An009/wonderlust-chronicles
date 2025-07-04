import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

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
    excerpt: 'Discover the magic of Morocco through our comprehensive guide covering everything from bustling medinas to serene desert landscapes.',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: 12,
    category: 'Destination Guide'
  },
  {
    id: 2,
    slug: 'marrakech-food-scene',
    title: 'Marrakech Food Scene: A Culinary Journey Through the Red City',
    excerpt: 'Explore the vibrant flavors of Marrakech, from street food in Jemaa el-Fnaa to fine dining in luxury riads.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    author: 'Ahmed Hassan',
    date: '2024-01-10',
    readTime: 8,
    category: 'Food & Culture'
  },
  {
    id: 3,
    slug: 'sahara-desert-experience',
    title: 'Sleeping Under the Stars: A Sahara Desert Experience',
    excerpt: 'Journey into the heart of the Sahara for an unforgettable night under the infinite desert sky.',
    image: 'https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    author: 'Maria Rodriguez',
    date: '2024-01-05',
    readTime: 10,
    category: 'Adventure'
  },
  {
    id: 4,
    slug: 'chefchaouen-blue-pearl',
    title: 'Chefchaouen: Discovering Morocco\'s Blue Pearl',
    excerpt: 'Wander through the enchanting blue streets of Chefchaouen and uncover the stories behind this magical mountain town.',
    image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    author: 'David Chen',
    date: '2024-01-01',
    readTime: 7,
    category: 'Photography'
  },
  {
    id: 5,
    slug: 'fes-artisan-workshops',
    title: 'Traditional Crafts in Fes: Behind the Scenes of Ancient Artisanship',
    excerpt: 'Step into the workshops of Fes to witness centuries-old crafts being practiced by master artisans.',
    image: 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    author: 'Fatima Al-Zahra',
    date: '2023-12-28',
    readTime: 9,
    category: 'Culture'
  },
  {
    id: 6,
    slug: 'atlas-mountains-trekking',
    title: 'Trekking the Atlas Mountains: A Journey to Morocco\'s Roof',
    excerpt: 'Discover the breathtaking beauty of the Atlas Mountains and the Berber villages that call them home.',
    image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    author: 'James Wilson',
    date: '2023-12-25',
    readTime: 11,
    category: 'Adventure'
  }
];

const BlogPreview: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-xl">
        <div ref={ref} className={`text-center mb-16 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="heading-lg text-earth-primary mb-6">
            Latest Stories
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto text-neutral-600">
            Dive into our latest travel stories, guides, and insights from around the world
          </p>
        </div>

        <div className="grid-responsive">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`card-interactive group ${
                inView ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="image-hover w-full h-48"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 badge bg-accent-primary text-white font-semibold">
                    {post.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="card-content">
                  <div className="flex items-center space-x-4 text-caption text-neutral-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>

                  <h3 className="heading-sm text-earth-primary mb-4 line-clamp-2 group-hover:text-accent-primary transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-body text-neutral-600 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-earth-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-earth-primary" />
                      </div>
                      <span className="text-body-sm text-neutral-600 font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-accent-primary group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-body-sm font-semibold">Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/blog" className="btn-secondary text-lg px-8 py-4">
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;