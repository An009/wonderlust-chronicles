import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI travel assistant. Ask me anything about destinations, local tips, or travel planning!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: generateAIResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('morocco') || input.includes('marrakech')) {
      return "Morocco is incredible! I'd recommend visiting Marrakech for the vibrant souks, Fes for authentic culture, and don't miss the Sahara Desert experience. The best time to visit is spring (March-May) or fall (September-November). Would you like specific recommendations for any of these places?";
    }
    
    if (input.includes('budget') || input.includes('cost')) {
      return "Travel budgets vary greatly by destination and style. For Morocco, budget travelers can manage on $30-50/day, mid-range $50-100/day, and luxury $150+/day. I can help you plan a budget for specific destinations - which country interests you?";
    }
    
    if (input.includes('food') || input.includes('eat')) {
      return "Food is one of the best parts of travel! Each destination has unique flavors. Are you interested in street food adventures, fine dining, or local cooking classes? I can recommend the best culinary experiences based on your destination.";
    }
    
    return "That's a great question! I'd love to help you plan your perfect trip. Could you tell me more about what type of experience you're looking for or which destinations interest you most?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-secondary hover:to-accent-primary text-white p-4 rounded-full shadow-custom-xl hover:shadow-custom-xl transition-all duration-300 transform hover:scale-110 z-50 animate-float ${
          isOpen ? 'hidden' : 'block'
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-nature-primary rounded-full animate-pulse">
          <Sparkles className="h-3 w-3 text-white absolute top-0.5 left-0.5" />
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-96 h-[600px] card overflow-hidden z-50 animate-scale-in shadow-custom-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-earth-primary to-earth-secondary text-white p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full animate-pulse-slow">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI Travel Assistant</h3>
                <p className="text-sm text-earth-light">Ask me anything!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
              >
                <div className={`flex items-start space-x-3 max-w-[85%] ${
                  message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`p-2 rounded-full shadow-custom ${
                    message.isUser ? 'bg-accent-primary' : 'bg-earth-primary'
                  }`}>
                    {message.isUser ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  
                  <div className={`p-4 rounded-2xl shadow-custom ${
                    message.isUser
                      ? 'bg-accent-primary text-white rounded-br-sm'
                      : 'bg-white text-neutral-800 rounded-bl-sm border border-neutral-200'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.isUser ? 'text-accent-light' : 'text-neutral-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-slide-up">
                <div className="flex items-start space-x-3">
                  <div className="bg-earth-primary p-2 rounded-full shadow-custom">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-bl-sm shadow-custom border border-neutral-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-neutral-200 bg-white">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about destinations, tips, planning..."
                className="form-input flex-1 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="btn-primary p-3 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;