import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  if (isSubscribed) {
    return (
      <div className="bg-nature-primary text-white p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-white" />
          <h3 className="text-2xl font-playfair font-bold mb-2">Welcome Aboard!</h3>
          <p className="text-nature-light">
            You'll receive personalized travel recommendations and exclusive content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-earth-primary to-earth-secondary text-white p-8 rounded-2xl shadow-xl">
      <div className="text-center mb-6">
        <Mail className="h-12 w-12 mx-auto mb-4 text-earth-light" />
        <h3 className="text-2xl font-playfair font-bold mb-2">
          Get Personalized Travel Inspiration
        </h3>
        <p className="text-earth-light">
          Subscribe for AI-curated destination recommendations based on your interests
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent-primary hover:bg-accent-secondary text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <div className="loading-dots">Subscribing</div>
          ) : (
            <>
              <span>Subscribe Now</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-earth-light mt-4 text-center">
        No spam, unsubscribe anytime. We respect your privacy.
      </p>
    </div>
  );
};

export default NewsletterSignup;