import React from 'react';
import { Link } from "react-router";
import { Clock, BarChart3, Target, Users, ArrowRight } from 'lucide-react';

function Land() {
  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Time Tracking",
      description: "Track your time with precision and ease"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics",
      description: "Get insights into your productivity patterns"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal Setting",
      description: "Set and achieve your productivity goals"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Management",
      description: "Collaborate and manage team productivity"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className= "bg-white shadow-sm ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">TimeTracker</span>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple Time Tracking
            <span className="text-blue-600"> Made Easy</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Track your time, boost productivity, and gain insights into how you work. 
            Perfect for freelancers, teams, and anyone who wants to make the most of their time.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-flex items-center group">
            <Link
            to="/time">
            Get Started Free
            </Link>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-blue-600 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to take control of your time?
          </h2>
          <p className="text-gray-600 mb-6">
            Join us for improved your productivity with TimeTracker.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            <Link
            to="/time">
            Get Started Free
            </Link>
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Land;