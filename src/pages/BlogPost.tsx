import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, Share2, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BlogPost: React.FC = () => {
  const { slug } = useParams();

  // Sample blog post data - in a real app, this would come from an API
  const post = {
    title: 'The Ultimate Guide to Morocco: From Imperial Cities to Desert Adventures',
    content: `# Discovering the Magic of Morocco

Morocco is a country that captivates the senses and ignites the imagination. From the bustling souks of Marrakech to the serene dunes of the Sahara Desert, this North African gem offers an incredible diversity of experiences that will leave you spellbound.

## Imperial Cities: Windows to Morocco's Rich History

### Marrakech - The Red City

Marrakech, known as the "Red City" for its distinctive red sandstone buildings, is perhaps Morocco's most famous destination. The heart of the city is **Jemaa el-Fnaa**, a UNESCO World Heritage site that transforms throughout the day.

**Must-visit attractions:**
- Bahia Palace - A stunning example of Moroccan architecture
- Majorelle Garden - A botanical paradise created by French painter Jacques Majorelle
- Koutoubia Mosque - The largest mosque in Marrakech with its iconic minaret
- Saadian Tombs - Ancient royal burial grounds rediscovered in 1917

### Fes - The Cultural Capital

Fes is home to the world's oldest continuously operating university and boasts the largest car-free urban area in the world. The medina of Fes el-Bali is a labyrinth of narrow streets, traditional workshops, and historic monuments.

**Highlights include:**
- Al-Qarawiyyin University and Mosque
- Chouara Tannery - witness traditional leather-making processes
- Bou Inania Madrasa - exquisite Islamic architecture
- Dar Batha Museum - showcasing Moroccan arts and crafts

## The Sahara Desert Experience

No trip to Morocco is complete without experiencing the magic of the Sahara Desert. The journey typically begins from Merzouga, where you'll embark on a camel trek into the golden dunes of Erg Chebbi.

### What to Expect:
- **Camel Trekking**: Ride through the dunes as the sun sets, painting the sky in brilliant oranges and purples
- **Desert Camping**: Spend the night in traditional Berber tents under a canopy of stars
- **Sunrise Views**: Wake early to witness the spectacular sunrise over the dunes
- **Local Culture**: Meet Berber families and learn about their traditional way of life

## Practical Travel Tips

### Best Time to Visit
- **Spring (March-May)**: Pleasant temperatures and blooming landscapes
- **Fall (September-November)**: Comfortable weather after the summer heat
- **Winter (December-February)**: Mild days but cold nights, especially in the desert
- **Summer (June-August)**: Very hot, especially inland - best avoided

### Cultural Etiquette
- Dress modestly, especially when visiting religious sites
- Learn basic Arabic or French greetings
- Bargaining is expected in souks and markets
- Remove shoes when entering mosques or traditional homes
- Use your right hand for eating and greeting

### Transportation
- **Trains**: Comfortable and efficient between major cities
- **Buses**: Extensive network covering most destinations
- **Grand Taxis**: Shared taxis for shorter distances
- **Car Rental**: Gives you flexibility but requires confidence in local driving conditions

## Culinary Adventures

Moroccan cuisine is a feast for the senses, blending Arab, Berber, and Mediterranean influences:

### Must-Try Dishes:
- **Tagine**: Slow-cooked stews in cone-shaped clay pots
- **Couscous**: Traditional Friday meal, often served with vegetables and meat
- **Pastilla**: Sweet and savory pastry typically filled with pigeon or chicken
- **Mint Tea**: The national drink, served throughout the day
- **Harira**: Hearty soup often eaten during Ramadan

## Shopping and Souks

The souks of Morocco are treasure troves of handcrafted goods:

- **Carpets and Rugs**: Hand-woven Berber and Arab designs
- **Leather Goods**: Bags, shoes, and jackets from Fes tanneries
- **Ceramics**: Beautiful pottery from Safi and Fes
- **Spices**: Saffron, ras el hanout, and other aromatic blends
- **Jewelry**: Silver Berber jewelry and modern designs

## Conclusion

Morocco offers an incredible journey through time and culture. Whether you're exploring ancient medinas, trekking through the Atlas Mountains, or camping under the desert stars, every moment in Morocco is an adventure waiting to unfold.

The key to enjoying Morocco is to embrace its pace, respect its customs, and remain open to the unexpected encounters that make travel truly transformative.`,
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: 12,
    category: 'Destination Guide',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    tags: ['Morocco', 'Travel Guide', 'Sahara Desert', 'Imperial Cities', 'Culture']
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareUrl = window.location.href;
  const shareTitle = post.title;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="gradient-overlay" />
        
        {/* Back Button */}
        <Link
          to="/blog"
          className="absolute top-8 left-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-accent-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            {post.tags.map(tag => (
              <span key={tag} className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-earth-primary mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-neutral-600 mb-6">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center space-x-4 pb-6 border-b border-neutral-200">
            <span className="text-neutral-600 font-medium">Share:</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-blue-600 transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-blue-400 transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-blue-700 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-playfair font-bold text-earth-primary mt-8 mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-playfair font-semibold text-earth-primary mt-8 mb-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-playfair font-semibold text-earth-secondary mt-6 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-neutral-700 leading-relaxed mb-4">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-2 mb-4 text-neutral-700">
                  {children}
                </ul>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-earth-primary">
                  {children}
                </strong>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-accent-primary pl-6 italic text-neutral-600 my-6">
                  {children}
                </blockquote>
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-neutral-50 rounded-xl">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-earth-primary rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-earth-primary mb-2">
                About {post.author}
              </h3>
              <p className="text-neutral-600">
                Sarah is a travel writer and photographer with over 10 years of experience exploring Morocco. 
                She specializes in cultural immersion and sustainable tourism practices.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-playfair font-bold text-earth-primary mb-6">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/blog/marrakech-food-scene" className="card overflow-hidden group">
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                alt="Marrakech Food Scene"
                className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="p-4">
                <h4 className="font-semibold text-earth-primary group-hover:text-accent-primary transition-colors">
                  Marrakech Food Scene: A Culinary Journey
                </h4>
              </div>
            </Link>
            <Link to="/blog/sahara-desert-experience" className="card overflow-hidden group">
              <img
                src="https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                alt="Sahara Desert Experience"
                className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="p-4">
                <h4 className="font-semibold text-earth-primary group-hover:text-accent-primary transition-colors">
                  Sleeping Under the Stars: A Sahara Desert Experience
                </h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;