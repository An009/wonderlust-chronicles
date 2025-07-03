import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SupabaseProvider } from './contexts/SupabaseContext';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import BlogPost from './pages/BlogPost';
import BlogList from './pages/BlogList';
import ItineraryBuilder from './pages/ItineraryBuilder';
import DestinationMap from './pages/DestinationMap';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';

function App() {
  return (
    <SupabaseProvider>
      <Router>
        <div className="min-h-screen bg-neutral-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/itinerary" element={<ItineraryBuilder />} />
              <Route path="/map" element={<DestinationMap />} />
            </Routes>
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </Router>
    </SupabaseProvider>
  );
}

export default App;