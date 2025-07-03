import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, Users, Clock, Download, Save, Wand2 } from 'lucide-react';

interface ItineraryDay {
  day: number;
  activities: Activity[];
}

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  cost: number;
}

const ItineraryBuilder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    destination: '',
    duration: 7,
    budget: 1000,
    travelers: 2,
    interests: [] as string[],
    travelStyle: ''
  });
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const interests = [
    'Culture & History',
    'Adventure & Outdoor',
    'Food & Cuisine',
    'Photography',
    'Relaxation',
    'Nightlife',
    'Shopping',
    'Nature & Wildlife'
  ];

  const travelStyles = [
    { id: 'budget', name: 'Budget Traveler', description: 'Hostels, street food, public transport' },
    { id: 'mid-range', name: 'Mid-Range', description: 'Hotels, mix of dining, some tours' },
    { id: 'luxury', name: 'Luxury', description: 'Premium hotels, fine dining, private tours' }
  ];

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Sample generated itinerary for Morocco
    const sampleItinerary: ItineraryDay[] = [
      {
        day: 1,
        activities: [
          {
            id: '1',
            time: '09:00',
            title: 'Arrival in Marrakech',
            description: 'Arrive at Marrakech Menara Airport and transfer to your riad',
            location: 'Marrakech Airport',
            duration: '2 hours',
            cost: 30
          },
          {
            id: '2',
            time: '14:00',
            title: 'Explore Jemaa el-Fnaa',
            description: 'Discover the heart of Marrakech with its vibrant square and street performers',
            location: 'Jemaa el-Fnaa',
            duration: '3 hours',
            cost: 0
          },
          {
            id: '3',
            time: '19:00',
            title: 'Traditional Moroccan Dinner',
            description: 'Enjoy authentic tagine and mint tea at a local restaurant',
            location: 'Medina Restaurant',
            duration: '2 hours',
            cost: 25
          }
        ]
      },
      {
        day: 2,
        activities: [
          {
            id: '4',
            time: '09:00',
            title: 'Majorelle Garden Visit',
            description: 'Explore the beautiful botanical garden created by Jacques Majorelle',
            location: 'Majorelle Garden',
            duration: '2 hours',
            cost: 15
          },
          {
            id: '5',
            time: '12:00',
            title: 'Bahia Palace Tour',
            description: 'Discover the stunning 19th-century palace with its intricate architecture',
            location: 'Bahia Palace',
            duration: '1.5 hours',
            cost: 10
          },
          {
            id: '6',
            time: '15:00',
            title: 'Souk Shopping Experience',
            description: 'Navigate the bustling souks and practice your bargaining skills',
            location: 'Marrakech Souks',
            duration: '3 hours',
            cost: 50
          }
        ]
      }
    ];
    
    setItinerary(sampleItinerary);
    setIsGenerating(false);
    setStep(3);
  };

  const exportToPDF = () => {
    // In a real app, this would generate a PDF
    alert('PDF export functionality would be implemented here');
  };

  const saveItinerary = () => {
    // In a real app, this would save to the database
    alert('Itinerary saved successfully!');
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-16">
      {/* Header */}
      <div className="bg-earth-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
            AI Itinerary Builder
          </h1>
          <p className="text-xl text-earth-light max-w-3xl mx-auto">
            Create personalized travel itineraries powered by artificial intelligence
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= stepNumber 
                  ? 'bg-earth-primary text-white' 
                  : 'bg-neutral-200 text-neutral-500'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 mx-4 ${
                  step > stepNumber ? 'bg-earth-primary' : 'bg-neutral-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Preferences */}
        {step === 1 && (
          <div className="card p-8 animate-fade-in">
            <h2 className="text-2xl font-playfair font-bold text-earth-primary mb-6">
              Tell us about your trip
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <input
                    type="text"
                    value={preferences.destination}
                    onChange={(e) => setPreferences(prev => ({ ...prev, destination: e.target.value }))}
                    placeholder="Where would you like to go?"
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Duration (days)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="number"
                      value={preferences.duration}
                      onChange={(e) => setPreferences(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      min="1"
                      max="30"
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Budget (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="number"
                      value={preferences.budget}
                      onChange={(e) => setPreferences(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                      min="100"
                      step="100"
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Travelers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="number"
                      value={preferences.travelers}
                      onChange={(e) => setPreferences(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
                      min="1"
                      max="10"
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-4">
                  What interests you?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all duration-300 ${
                        preferences.interests.includes(interest)
                          ? 'bg-earth-primary text-white border-earth-primary'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:border-earth-primary'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-4">
                  Travel Style
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {travelStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setPreferences(prev => ({ ...prev, travelStyle: style.id }))}
                      className={`p-4 rounded-lg border text-left transition-all duration-300 ${
                        preferences.travelStyle === style.id
                          ? 'bg-earth-primary text-white border-earth-primary'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:border-earth-primary'
                      }`}
                    >
                      <h3 className="font-semibold mb-1">{style.name}</h3>
                      <p className="text-sm opacity-80">{style.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={() => setStep(2)}
                disabled={!preferences.destination || !preferences.travelStyle}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Generate */}
        {step === 2 && (
          <div className="card p-8 text-center animate-fade-in">
            <h2 className="text-2xl font-playfair font-bold text-earth-primary mb-6">
              Ready to create your itinerary?
            </h2>
            
            <div className="bg-neutral-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-neutral-800 mb-4">Your Trip Summary:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-neutral-600">Destination:</span>
                  <p className="font-medium">{preferences.destination}</p>
                </div>
                <div>
                  <span className="text-neutral-600">Duration:</span>
                  <p className="font-medium">{preferences.duration} days</p>
                </div>
                <div>
                  <span className="text-neutral-600">Budget:</span>
                  <p className="font-medium">${preferences.budget}</p>
                </div>
                <div>
                  <span className="text-neutral-600">Travelers:</span>
                  <p className="font-medium">{preferences.travelers}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-neutral-600">Interests:</span>
                <p className="font-medium">{preferences.interests.join(', ')}</p>
              </div>
            </div>

            <button
              onClick={generateItinerary}
              disabled={isGenerating}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
            >
              <Wand2 className="h-5 w-5" />
              <span>{isGenerating ? 'Generating...' : 'Generate AI Itinerary'}</span>
            </button>

            {isGenerating && (
              <div className="mt-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-primary mx-auto"></div>
                <p className="text-neutral-600 mt-4">
                  Our AI is crafting your perfect itinerary...
                </p>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="text-neutral-600 hover:text-earth-primary transition-colors"
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Itinerary */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-playfair font-bold text-earth-primary">
                Your Personalized Itinerary
              </h2>
              <div className="flex space-x-4">
                <button
                  onClick={saveItinerary}
                  className="flex items-center space-x-2 bg-nature-primary hover:bg-nature-secondary text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={exportToPDF}
                  className="flex items-center space-x-2 bg-accent-primary hover:bg-accent-secondary text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {itinerary.map((day) => (
                <div key={day.day} className="card p-6">
                  <h3 className="text-xl font-playfair font-semibold text-earth-primary mb-6">
                    Day {day.day}
                  </h3>
                  
                  <div className="space-y-4">
                    {day.activities.map((activity) => (
                      <div key={activity.id} className="flex space-x-4 p-4 bg-neutral-50 rounded-lg">
                        <div className="flex-shrink-0 w-16 text-center">
                          <div className="bg-earth-primary text-white px-2 py-1 rounded text-sm font-medium">
                            {activity.time}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-earth-primary mb-1">
                            {activity.title}
                          </h4>
                          <p className="text-neutral-600 text-sm mb-2">
                            {activity.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-neutral-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{activity.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{activity.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-3 w-3" />
                              <span>${activity.cost}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Daily Total:</span>
                      <span className="font-semibold text-earth-primary">
                        ${day.activities.reduce((sum, activity) => sum + activity.cost, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="text-neutral-600 hover:text-earth-primary transition-colors"
              >
                ← Create New Itinerary
              </button>
              <div className="text-right">
                <p className="text-sm text-neutral-600">Total Trip Cost:</p>
                <p className="text-2xl font-bold text-earth-primary">
                  ${itinerary.reduce((total, day) => 
                    total + day.activities.reduce((sum, activity) => sum + activity.cost, 0), 0
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryBuilder;