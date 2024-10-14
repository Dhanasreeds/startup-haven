import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex flex-col justify-center items-center text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to AYUSH StartupLaunch</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Your one-stop platform for AYUSH startup registration, document management, and resources.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link to="/signup">Get Started</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/resources">Explore AYUSH Resources</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;