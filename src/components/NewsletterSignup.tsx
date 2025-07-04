import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Sparkles } from 'lucide-react';

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
      <div className="card bg-gradient-to-br from-nature-primary to-nature-secondary text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-nature-primary/90 to-nature-secondary/90" />
        <div className="relative card-content text-center animate-scale-in">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h3 className="heading-md mb-4">Welcome Aboard!</h3>
          <p className="text-body-lg text-nature-light">
            You'll receive personalized travel recommendations and exclusive content straight to your inbox.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-gradient-to-br from-earth-primary to-earth-secondary text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-earth-primary/95 to-earth-secondary/95" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
      
      <div className="relative card-content">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h3 className="heading-md mb-4">
            Get Personalized Travel Inspiration
          </h3>
          <p className="text-body-lg text-earth-light">
            Subscribe for AI-curated destination recommendations based on your interests
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="form-input bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/70 focus:ring-white/50 focus:border-white/50"
              required
            />
            <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-accent w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="loading-spinner w-5 h-5" />
                <span>Subscribing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>Subscribe Now</span>
                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            )}
          </button>
        </form>

        <p className="text-caption text-earth-light mt-6 text-center">
          No spam, unsubscribe anytime. We respect your privacy and follow GDPR guidelines.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;